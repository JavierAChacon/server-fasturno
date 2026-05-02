import type { Request, Response, NextFunction } from 'express'
import auth from '../lib/auth'
import response from '../utils/response'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  })

  if (!session) {
    return response.error(res, 'Unauthorized', 401)
  }

  req.user = session.user
  req.session = session.session
  req.organizationId = session.session.activeOrganizationId

  next()
}
