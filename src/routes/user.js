import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { Users } from '../models'

const userRouter = Router()

userRouter.post('/create', createUser)
userRouter.post('/login', loginUser)

async function createUser(req, res) {
  const { username, password } = req.body

  if (!username && !password) {
    return res.status(400).json({
      success: false,
      messsage: 'Informe usuário e senha',
    })
  }

  const newUser = new Users({
    username,
    password,
  })

  newUser.save()

  res.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso',
  })
}

async function loginUser(req, res) {
  const { username, password } = req.body

  Users.findOne({ username }, (err, user) => {
    // if(err) /* handle error */
    if (!user)
      return res
        .status(400)
        .json({ success: false, user: null, message: 'Usuário não encontrado' })

    user.validatePassword(password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: err,
        })
      }

      const token = jwt.sign('payload', 'privateKey')

      res.json({
        success: true,
        user,
        token,
      })
    })
  })
}

export default userRouter
