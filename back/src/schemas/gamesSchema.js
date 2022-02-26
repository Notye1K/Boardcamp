import joi from 'joi'

const schema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.string().pattern(/^[0-9]+$/, 'numbers').required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.string().pattern(/^[0-9]+$/, 'numbers').required()
})

export default schema
