import { Router } from "express"
import validateSchema from '../middlewares/validateSchema.js'
import schema from "../schemas/rentalsSchema.js"
import { postRentals, getRentals } from '../controllers/rentalsController.js'

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', validateSchema(schema), postRentals)
rentalsRouter.post('/rentals/:id/return')
rentalsRouter.delete('/rentals/:id')

export default rentalsRouter
