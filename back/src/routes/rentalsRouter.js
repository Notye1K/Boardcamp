import { Router } from "express"

const rentalsRouter = Router()

rentalsRouter.get('/rentals')
rentalsRouter.post('/rentals')
rentalsRouter.post('/rentals/:id/return')
rentalsRouter.delete('/rentals/:id')

export default rentalsRouter