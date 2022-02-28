import connection from '../db.js'

export default function checkId(tab) {
    return async (req, res, next) => {
        if (isNaN(req.params.id) || !Number.isInteger(parseFloat(req.params.id))) {
            return res.sendStatus(404)
        }

        const id = await connection.query(`SELECT id FROM ${tab} WHERE id=$1`, [req.params.id])

        if (id.rows.length === 0) {
            return res.sendStatus(404)
        }
        next()
    }
}
