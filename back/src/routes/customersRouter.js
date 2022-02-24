import { Router } from "express"

const customersRouter = Router()

customersRouter.get('/customers')
customersRouter.get('/customers/:id')
customersRouter.post('/customers')
customersRouter.put('/customers/:id')

export default customersRouter