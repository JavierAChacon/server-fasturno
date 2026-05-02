import { z } from 'zod'
import * as services from './services'
import * as schemas from './schemas'
import response from '../../utils/response'
import type { Request, Response } from 'express'

export const getOrganization = async (req: Request, res: Response) => {
  try {
    const organizationId = req.organizationId

    if (!organizationId) {
      return response.error(res, 'No active organization selected in session', 400)
    }

    const organization = await services.getOrganizationById(organizationId)
    if (!organization) {
      return response.error(res, 'Organization not found', 404)
    }

    return response.success(res, organization)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}

export const updateOrganization = async (
  req: Request<{}, {}, schemas.UpdateOrganizationRequest>,
  res: Response,
) => {
  try {
    const organizationId = req.organizationId
    const userId = req.user!.id

    if (!organizationId) {
      return response.error(res, 'No active organization selected in session', 400)
    }

    const member = await services.getRoleOrganization(userId, organizationId)

    if (member?.role !== 'owner' && member?.role !== 'admin') {
      return response.error(res, 'You do not have permission to update this organization', 403)
    }

    const result = schemas.updateOrganization.safeParse(req.body)
    if (!result.success) {
      return response.error(res, 'Validation error', 400, z.flattenError(result.error).fieldErrors)
    }

    const updatedOrganization = await services.updateOrganization(organizationId, result.data)
    return response.success(res, updatedOrganization)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}
