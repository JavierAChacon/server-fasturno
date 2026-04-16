import type { Response } from 'express'

export const successResponse = <T>(res: Response, data: T, message = 'OK', status = 200) => {
  return res.status(status).json({ 
    success: true, 
    statusCode: status, 
    message, 
    data 
  })
}

export const errorResponse = (
  res: Response, 
  message: string, 
  status = 400, 
  errors: unknown = null
) => {
  return res.status(status).json({ 
    success: false, 
    statusCode: status, 
    message, 
    errors 
  })
}
