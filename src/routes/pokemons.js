import { Router } from 'express'

import { Pokemons } from '../models'
import { authMiddleware } from '../middlewares'

const pokemonsRouter = Router()

/* Rotas públicas */
pokemonsRouter.get('/all', getAllPokemons)

/* Rotas privadas */
pokemonsRouter.use(authMiddleware)
pokemonsRouter.post('/create', createPokemon)

async function getAllPokemons(req, res) {
  const pokemons = await Pokemons.find({})

  return res.status(200).json({
    success: true,
    pokemons,
  })
}

async function createPokemon(req, res) {
  // const { types, name, height, weight, pokedex, moves, image } = req.body
  const newPoke = new Pokemons({ ...req.body })

  newPoke.save(err => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: err,
      })
    }
  })

  res.status(201).json({
    success: true,
    newPoke,
  })
}

export default pokemonsRouter
