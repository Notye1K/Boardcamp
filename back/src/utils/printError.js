export default function printError(res, error) {
    if (error.code === '42703') {
        return res.sendStatus(404)
    }
    console.log(error)
    return res.status(500).send(error)
}
