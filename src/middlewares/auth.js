import { Users } from '../models'

import jwt from 'jsonwebtoken'

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    const decodedToken = jwt.verify(token, 'privateKey')
    return next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Erro interno do servidor',
      error: err,
    })
  }
}

export { authMiddleware }
