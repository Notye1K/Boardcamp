import { Router } from "express"
import { getGames, postGames } from '../controllers/gamesController.js'
import validateSchema from '../middlewares/validateSchema.js'
import checkName from '../middlewares/checkName.js'
import schema from '../schemas/gamesSchema.js'
import checkQuery from "../middlewares/checkQuery.js"

const gamesRouter = Router()

gamesRouter.get('/games', checkQuery, getGames)
gamesRouter.post('/games', validateSchema(schema), checkName('games', 'name'), postGames)

export default gamesRouter
