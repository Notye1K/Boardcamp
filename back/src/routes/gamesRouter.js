import { Router } from "express"
import { getGames, postGames } from '../controllers/gamesController.js'
import validateSchema from '../middlewares/validateSchema.js'
import checkName from '../middlewares/checkName.js'
import schema from '../schemas/gamesSchema.js'

const gamesRouter = Router()

gamesRouter.get('/games', getGames)
gamesRouter.post('/games', validateSchema(schema), checkName('games'), postGames)

export default gamesRouter
