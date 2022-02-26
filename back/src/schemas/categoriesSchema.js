import joi from 'joi'

const schema = joi.object({
    name: joi.string().required()
})

export default schema
