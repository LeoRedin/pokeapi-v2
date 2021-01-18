import { Router } from 'express'

import { Users } from '../models'

const userRouter = Router()

userRouter.post('/create', createUser)
userRouter.post('/login', loginUser)

async function createUser(req, res) {
  /* const { username, password } = req.body */

  /* lidar com os erros */

  const newUser = new Users({ ...req.body })

  newUser.save()

  res.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso',
  })
}

async function loginUser(req, res) {
  const { username, password } = req.body

  Users.findOne({ username }, (err, user) => {
    /* if(err) // lidam com o erro */
    if (!user)
      return res.status(400).json({
        success: false,
        message: 'Usuário não encontrado',
      })

    user.validatePassword(password, (err, isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          success: false,
          message: err,
        })

      return res.json({
        success: true,
        user,
      })
    })
  })
}

export default userRouter
