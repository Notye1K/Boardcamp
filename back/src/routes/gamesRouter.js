import { Router } from "express"

const gamesRouter = Router()

gamesRouter.get('/games')
gamesRouter.post('/games')

export default gamesRouter