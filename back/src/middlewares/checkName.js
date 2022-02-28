import connection from '../db.js'

export default function checkName(tab, column) {
    return async (req, res, next) => {
        const name = await connection.query(`SELECT name FROM ${tab} WHERE ${column}=$1`, [req.body[column]])

        if (name.rows.length !== 0) {
            return res.sendStatus(409)
        }
        next()
    }
}
