import { Router } from "express"
import validateSchema from '../middlewares/validateSchema.js'
import { getCategories, postCategories } from '../controllers/categoriesController.js'
import schema from '../schemas/categoriesSchema.js'

const categoriesRouter = Router()

categoriesRouter.get('/categories', getCategories)
categoriesRouter.post('/categories', validateSchema(schema), postCategories)

export default categoriesRouter