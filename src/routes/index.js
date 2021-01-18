import { Router } from 'express'

import typesRouter from './types'
import pokemonsRouter from './pokemons'
import userRouter from './user'

const router = Router()

router.use('/types', typesRouter)
router.use('/pokemons', pokemonsRouter)
router.use('/user', userRouter)

export default router
