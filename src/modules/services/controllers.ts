import type { Request, Response } from 'express'
import * as schema from './schemas'
import * as service from './services'
import { errorResponse, successResponse } from '../../utils/response'

export const createService = async (req: Request<{}, {}, schema.CreateServiceRequest>, res: Response) => {
  const data = schema.createService.parse(req.body)
  const createdService = await service.createService(data)
  return successResponse(res, createdService, 'Service created successfully', 201)
}

export const getServices = async (req: Request, res: Response) => {
  const organizationId = req.organizationId

  if (!organizationId) {
    return errorResponse(res, 'No active organization selected in session', 400)
  }

  const servicesList = await service.getServicesByOrganization(organizationId)
  return successResponse(res, servicesList)
}

export const getServiceById = async (req: Request<{ serviceId: string }>, res: Response) => {
  const { serviceId } = req.params
  const serviceFound = await service.getServiceById(serviceId)
  return successResponse(res, serviceFound)
}

export const updateService = async (
  req: Request<{ serviceId: string }, {}, schema.UpdateServiceRequest>,
  res: Response,
) => {
  const { serviceId } = req.params
  const data = schema.updateService.parse(req.body)
  const updatedService = await service.updateService(serviceId, data)
  return successResponse(res, updatedService, 'Service updated successfully')
}

export const deleteService = async (req: Request<{ serviceId: string }>, res: Response) => {
  const { serviceId } = req.params
  await service.deleteService(serviceId)
  return successResponse(res, null, 'Service deleted successfully')
}
