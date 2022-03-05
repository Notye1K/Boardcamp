export default function validateSchema(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false })
        if (validation.error) {
            const errors = validation.error.details.map(v => v.message)
            return res.status(400).send(errors)
        }
        next()
    }
}
