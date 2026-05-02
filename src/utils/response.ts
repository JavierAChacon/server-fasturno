import type { Response } from 'express'

const response = {
  success: <T>(res: Response, data: T, status = 200) => {
    return res.status(status).json({ success: true, statusCode: status, data })
  },
  error: (res: Response, message: string, status = 400, errors?: Record<string, string[]>) => {
    return res.status(status).json({ success: false, statusCode: status, message, ...(errors && { errors }) })
  },
  unhandledError: (res: Response, error: unknown) => {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return res.status(500).json({ success: false, statusCode: 500, message })
  },
}

export default response
