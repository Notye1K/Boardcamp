import { Router } from 'express'
import categoriesRouter from './categoriesRouter.js'
import gamesRouter from './gamesRouter.js'
import customersRouter from './customersRouter.js'
import rentalsRouter from './rentalsRouter.js'

const routes = Router()

routes.use(categoriesRouter)
routes.use(gamesRouter)
routes.use(customersRouter)
routes.use(rentalsRouter)

export default routes
