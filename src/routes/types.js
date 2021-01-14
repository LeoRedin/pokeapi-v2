import { Router } from 'express'

import { Types } from '../models'

const typesRouter = Router()

typesRouter.get('/all', async (req, res) => {
  const types = await Types.find({})

  res.json({
    success: true,
    types,
  })
})

typesRouter.get('/:type', async (req, res) => {
  const { type } = req.params

  const dbType = await Types.findOne({ name: type })

  res.json({
    success: true,
    type: dbType,
  })
})

typesRouter.post('/create', async (req, res) => {
  const { name, hex } = req.body

  if (!name || !hex) {
    res.status(400).json({
      success: false,
      message: 'O nome e/ou hex são obrigatórios',
    })
  }

  const newType = new Types({
    name,
    hex,
  })

  await newType.save(err => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: err,
      })
    }
  })

  res.status(201).json({
    success: true,
    type: newType,
  })
})

export default typesRouter
