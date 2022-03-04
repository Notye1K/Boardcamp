import { Router } from "express"
import validateSchema from '../middlewares/validateSchema.js'
import schema from "../schemas/rentalsSchema.js"
import { postRentals, getRentals, leaseCompletion, deleteRental } from '../controllers/rentalsController.js'
import checkId from '../middlewares/checkId.js'
import checkQuery from '../middlewares/checkQuery.js'

const rentalsRouter = Router()

rentalsRouter.get('/rentals', checkQuery, getRentals)
rentalsRouter.post('/rentals', validateSchema(schema), postRentals)
rentalsRouter.post('/rentals/:id/return', checkId('rentals'), leaseCompletion)
rentalsRouter.delete('/rentals/:id', checkId('rentals'), deleteRental)

export default rentalsRouter
