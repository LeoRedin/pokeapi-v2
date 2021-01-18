import { Router } from 'express'

import typesRouter from './types'
import pokemonsRouter from './pokemons'
import userRouter from './users'

const router = Router()

router.use('/types', typesRouter)
router.use('/pokemons', pokemonsRouter)
router.use('/users', userRouter)

export default router
