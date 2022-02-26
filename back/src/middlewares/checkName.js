import connection from '../db.js'

export default function checkName(tab) {
    return async (req, res, next) => {
        const name = await connection.query(`SELECT name FROM ${tab} WHERE name=$1`, [req.body.name])

        if (name.rows.length !== 0) {
            return res.sendStatus(409)
        }
        next()
    }
}
