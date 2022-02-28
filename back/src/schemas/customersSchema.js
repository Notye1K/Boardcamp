import joi from 'joi'

const schema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/^([0-9]{10}|[0-9]{11})$/, 'phone').required(),
    cpf: joi.string().pattern(/^[0-9]{11}$/, 'cpf').required(),
    birthday: joi.date().iso().required()
})

export default schema
