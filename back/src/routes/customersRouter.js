import { Router } from "express"
import validateSchema from '../middlewares/validateSchema.js'
import schema from '../schemas/customersSchema.js'
import { getCustomers, getCustomersById, postCustomers, putCustomers } from "../controllers/customersController.js"
import checkName from '../middlewares/checkName.js'
import checkId from '../middlewares/checkId.js'

const customersRouter = Router()

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', checkId('customers'), getCustomersById)
customersRouter.post('/customers', validateSchema(schema), checkName('customers', 'cpf'), postCustomers)
customersRouter.put('/customers/:id', checkId('customers'), validateSchema(schema), putCustomers)

export default customersRouter
