import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { errorResponse } from './response'

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    const message = 'Validation failed'
    const errors = Object.fromEntries(
      error.issues.map((i) => [i.path[0], i.message])
    )

    return errorResponse(res, message, 400, errors)
  }

  console.error('[Error]', error)
  const message = error instanceof Error ? error.message : 'Internal server error'
  return errorResponse(res, message, 500)
}
