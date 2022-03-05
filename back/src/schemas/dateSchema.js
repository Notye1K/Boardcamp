import Joi from "joi"

const schema = Joi.date().iso().required()

export default schema
