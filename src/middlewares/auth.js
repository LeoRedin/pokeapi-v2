import { Users } from '../models'

async function authMiddleware(req, res, next) {
  next()
}

export { authMiddleware }
