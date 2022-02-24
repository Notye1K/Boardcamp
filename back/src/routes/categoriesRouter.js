import { Router } from "express"

const categoriesRouter = Router()

categoriesRouter.get('/categories')
categoriesRouter.post('/categories')

export default categoriesRouter