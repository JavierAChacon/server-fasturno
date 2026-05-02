import { z } from 'zod'
import * as schema from './schemas'
import * as services from './services'
import { addMinutes, parseISO } from 'date-fns'
import { getServiceById } from '../services/services'
import { getMemberById } from '../members/services'
import { getRoleOrganization } from '../organizations/services'
import response from '../../utils/response'
import type { Request, Response } from 'express'

export const createAppointment = async (req: Request<{}, {}, schema.CreateAppointment>, res: Response) => {
  try {
    const result = schema.createAppointment.safeParse(req.body)
    if (!result.success) {
      return response.error(res, 'Validation error', 400, z.flattenError(result.error).fieldErrors)
    }

    const { date, time, organizationId, serviceId, memberId, clientId } = result.data
    const startTime = parseISO(`${date}T${time}`)
    const loggedUserId = req.user!.id

    const isCreatorMember = await getRoleOrganization(loggedUserId, organizationId)
    if (!isCreatorMember) {
      return response.error(res, 'You do not have permission to create appointments in this organization', 403)
    }

    const service = await getServiceById(serviceId)
    if (!service || service.organizationId !== organizationId) {
      return response.error(res, 'Service not found or does not belong to this organization', 400)
    }

    const staffMember = await getMemberById(memberId)
    if (!staffMember || staffMember.organizationId !== organizationId) {
      return response.error(res, 'The selected staff member does not belong to this organization', 400)
    }

    const endTime = addMinutes(startTime, result.data.duration ?? service.duration)
    const overlap = await services.findOverlappingAppointment(memberId, startTime, endTime)
    if (overlap) {
      return response.error(res, 'The staff member is already booked at this time', 409)
    }

    const appointment = await services.createAppointment({ clientId, organizationId, serviceId, memberId, startTime, endTime })
    return response.success(res, appointment, 201)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}

export const getAppoinmentById = async (req: Request<{ appointmentId: string }>, res: Response) => {
  try {
    const { appointmentId } = req.params
    const appointment = await services.getAppoinmentById(appointmentId)
    return response.success(res, appointment)
  } catch (error) {
    return response.unhandledError(res, error)
  }
}
