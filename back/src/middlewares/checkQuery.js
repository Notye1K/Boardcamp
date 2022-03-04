export default function checkQuery(req, res, next) {
    const { offset, limit } = req.query
    if (offset && !isNatural(offset)) {
        return res.sendStatus(404)
    }
    if (limit && !isNatural(limit)) {
        return res.sendStatus(404)
    }
    next()
}

function isNatural(number) {
    if (isNaN(number)) {
        return false
    }
    number = parseFloat(number)
    if (!Number.isInteger(number) || number < 0) {
        return false
    }
    return true
}
