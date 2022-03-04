import { Router } from "express"
import validateSchema from '../middlewares/validateSchema.js'
import { getCategories, postCategories } from '../controllers/categoriesController.js'
import schema from '../schemas/categoriesSchema.js'
import checkName from "../middlewares/checkName.js"
import checkQuery from "../middlewares/checkQuery.js"

const categoriesRouter = Router()

categoriesRouter.get('/categories', checkQuery, getCategories)
categoriesRouter.post('/categories', validateSchema(schema), checkName('categories', 'name'), postCategories)

export default categoriesRouter
