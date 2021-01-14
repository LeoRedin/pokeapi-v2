import { Router } from 'express'

import { Types } from '../models'

const typesRouter = Router()

typesRouter.get('/all', async (req, res) => {
  try {
    const types = await Types.find({})

    res.json({
      success: true,
      types,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error,
    })
  }
})

typesRouter.get('/:type', async (req, res) => {
  const { type } = req.params

  try {
    const dbType = await Types.findOne({ name: type })

    res.json({
      success: true,
      type: dbType,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error,
    })
  }
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

typesRouter.post('/update', async (req, res) => {
  const { name, hex } = req.body

  if (!name || !hex) {
    res.status(400).json({
      success: false,
      message: 'O nome e o hex são obrigatórios',
    })
  }

  const type = await Types.findOne({ name })

  type.hex = hex
  type.updatedAt = new Date()

  await type.save(err => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: err,
      })
    }
  })

  /* const type = await Types.findOneAndUpdate(
    { name },
    { hex, updatedAt: new Date() },
  ) */

  res.status(200).json({
    success: true,
    type,
  })
})

typesRouter.delete('/delete', async (req, res) => {
  const { name } = req.body

  if (!name) {
    res.status(400).json({
      success: false,
      message: 'O nome do tipo é obrigatório',
    })
  }

  try {
    await Types.findOneAndDelete({ name })

    res.json({
      success: true,
      message: 'Tipo deletado!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error,
    })
  }
})

export default typesRouter
