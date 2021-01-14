import { Router } from 'express'

// importar o model

const pokemonsRouter = Router()

pokemonsRouter.get('/all', getAllPokemons)

async function getAllPokemons(req, res) {
  res.status(200).json({
    success: true,
    pokemons: [],
  })
}

export default pokemonsRouter
