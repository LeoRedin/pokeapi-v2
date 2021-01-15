import { Router } from 'express'

import { Pokemons } from '../models'

const pokemonsRouter = Router()

pokemonsRouter.get('/all', getAllPokemons)
pokemonsRouter.post('/create', createPokemon)

async function getAllPokemons(req, res) {
  const pokemons = await Pokemons.find({})

  res.status(200).json({
    success: true,
    pokemons,
  })
}

async function createPokemon(req, res) {
  // const { types, name, height, weight, pokedex, moves, image } = req.body
  const newPoke = new Pokemons({ ...req.body })

  newPoke.save(err => {
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
    newPoke,
  })
}

export default pokemonsRouter
