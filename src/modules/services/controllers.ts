import { z } from 'zod'
import type { Request, Response } from 'express'
import * as schema from './schemas'
import * as service from './services'
import response from '../../utils/response'

export const createService = async (req: Request<{}, {}, schema.CreateServiceRequest>, res: Response) => {
  try {
    const result = schema.createService.safeParse(req.body)
    if (!result.success) {
      return response.error(res, 'Validation error', 400, z.flattenError(result.error).fieldErrors)
    }

    const createdService = await service.createService(result.data)
    return response.success(res, createdService, 201)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}

export const getServices = async (req: Request, res: Response) => {
  try {
    const organizationId = req.organizationId

    if (!organizationId) {
      return response.error(res, 'No active organization selected in session', 400)
    }

    const servicesList = await service.getServicesByOrganization(organizationId)
    return response.success(res, servicesList)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}

export const getServiceById = async (req: Request<{ serviceId: string }>, res: Response) => {
  try {
    const { serviceId } = req.params
    const serviceFound = await service.getServiceById(serviceId)
    return response.success(res, serviceFound)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}

export const updateService = async (
  req: Request<{ serviceId: string }, {}, schema.UpdateServiceRequest>,
  res: Response,
) => {
  try {
    const result = schema.updateService.safeParse(req.body)
    if (!result.success) {
      return response.error(res, 'Validation error', 400, z.flattenError(result.error).fieldErrors)
    }

    const { serviceId } = req.params
    const updatedService = await service.updateService(serviceId, result.data)
    return response.success(res, updatedService)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}

export const deleteService = async (req: Request<{ serviceId: string }>, res: Response) => {
  try {
    const { serviceId } = req.params
    await service.deleteService(serviceId)
    return response.success(res, null)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}
