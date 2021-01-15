import { Users } from '../models'

async function authMiddleware(req, res, next) {
  const { username } = req.body
  // console.log("🚀 ~ file: auth.js ~ line 5 ~ authMiddleware ~ username", username)

  const user = await Users.findOne({ username })

  if (!user) {
    res.status(403).json({
      success: false,
      message: 'Usuário não autenticado',
    })
  }

  next()
}

export { authMiddleware }
