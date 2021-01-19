import { Router } from 'express'

import { Pokemons, Types } from '../models'
import { authMiddleware } from '../middlewares'

const pokemonsRouter = Router()

/* Rotas públicas */
pokemonsRouter.get('/all', getAllPokemons)

/* Rotas Privadas */
pokemonsRouter.use(authMiddleware)
pokemonsRouter.post('/create', createPokemon)

async function getAllPokemons(req, res) {
  const pokemons = await Pokemons.find({}).populate('types')

  res.status(200).json({
    success: true,
    pokemons,
  })
}

async function createPokemon(req, res) {
  const { types: requestTypes } = req.body

  const promises = []

  requestTypes.forEach(type => {
    promises.push(Types.findOne({ name: type }))
  })

  Promise.allSettled(promises).then(results => {
    const types = []

    results.forEach(({ status, value }) => {
      if (status === 'fulfilled' && value) {
        types.push(value._id)
      }
    })

    const newPokemon = new Pokemons({ ...req.body, types })

    newPokemon.save(err => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro interno do servidor',
          error: err,
        })
      }
    })

    return res.status(201).json({
      success: true,
      newPokemon,
    })
  })
}

export default pokemonsRouter
