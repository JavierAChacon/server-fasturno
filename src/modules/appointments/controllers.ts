import * as schema from './schemas'
import * as services from './services'
import { addMinutes } from 'date-fns'
import { getServiceById } from '../services/services'
import { getMemberById } from '../members/services'
import { getRoleOrganization } from '../organizations/services'
import { successResponse, errorResponse } from '../../utils/response'
import type { Request, Response } from 'express'

export const createAppointment = async (req: Request<{}, {}, schema.CreateAppointmentRequest>, res: Response) => {
  const data = schema.createAppointment.parse(req.body)
  const loggedUserId = req.user!.id
  const clientId = data.clientId

  const isCreatorMember = await getRoleOrganization(loggedUserId, data.organizationId)
  if (!isCreatorMember) {
    return errorResponse(res, 'You do not have permission to create appointments in this organization', 403)
  }

  const service = await getServiceById(data.serviceId)
  if (!service || service.organizationId !== data.organizationId) {
    return errorResponse(res, 'Service not found or does not belong to this organization', 400)
  }

  const staffMember = await getMemberById(data.memberId)
  if (!staffMember || staffMember.organizationId !== data.organizationId) {
    return errorResponse(res, 'The selected staff member does not belong to this organization', 400)
  }

  const endTime = addMinutes(data.startTime, service.duration)
  const overlap = await services.findOverlappingAppointment(data.memberId, data.startTime, endTime)

  if (overlap) {
    return errorResponse(res, 'The staff member is already booked at this time', 409)
  }

  const appointment = await services.createAppointment(clientId, data, endTime)
  return successResponse(res, appointment, 'Appointment created successfully', 201)
}

export const getAppoinmentById = async (req: Request<{ appointmentId: string }>, res: Response) => {
  const { appointmentId } = req.params
  const appointment = await services.getAppoinmentById(appointmentId)
  return successResponse(res, appointment)
}
