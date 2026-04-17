import * as services from './services'
import * as schemas from './schemas'
import { successResponse, errorResponse } from '../../utils/response'
import type { Request, Response } from 'express'

export const getOrganization = async (req: Request, res: Response) => {
  const organizationId = req.organizationId

  if (!organizationId) {
    return errorResponse(res, 'No active organization selected in session', 400)
  }

  const organization = await services.getOrganizationById(organizationId)
  if (!organization) {
    return errorResponse(res, 'Organization not found', 404)
  }

  return successResponse(res, organization)
}

export const updateOrganization = async (
  req: Request<{}, {}, schemas.UpdateOrganizationRequest>, 
  res: Response
) => {
  const organizationId = req.organizationId
  const userId = req.user!.id

  if (!organizationId) {
    return errorResponse(res, 'No active organization selected in session', 400)
  }

  const member = await services.getRoleOrganization(userId, organizationId)

  if (member?.role !== 'owner' && member?.role !== 'admin') {
    return errorResponse(res, 'You do not have permission to update this organization', 403)
  }

  const updatedOrganization = await services.updateOrganization(organizationId, req.body)
  return successResponse(res, updatedOrganization, 'Organization updated successfully')
}
