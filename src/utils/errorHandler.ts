import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { errorResponse } from './response'

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    return errorResponse(res, 'Validation error', 400, error.issues)
  }

  const message = error instanceof Error ? error.message : 'Internal server error'
  return errorResponse(res, message, 500)
}
