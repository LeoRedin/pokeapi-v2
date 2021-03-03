import jwt from 'jsonwebtoken'

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers?.authorization?.split(' ')[1] || 'sem-token'
    // Bearer meusupertoken
    // 0 Bearer
    // 1 Token
    const decodedToken = jwt.verify(token, 'privateKey')
    console.log(
      '🚀 ~ file: auth.js ~ line 12 ~ authMiddleware ~ decodedToken',
      decodedToken,
    )
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

export { authMiddleware }
