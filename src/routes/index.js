import { Router } from 'express'

import typesRouter from './types'
import pokemonsRouter from './pokemons'

const router = Router()

router.use('/types', typesRouter)
router.use('/pokemons', pokemonsRouter)

export default router
