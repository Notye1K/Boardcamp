import connection from "../db.js"

export default async function limitOffset(query, req) {
    if (req.query.offset && req.query.limit) {
        const result = await connection.query(`${query}
                    LIMIT $1 OFFSET $2`, [req.query.limit, req.query.offset])

        return result.rows
    }

    if (req.query.offset || req.query.limit) {
        const { limit, offset } = req.query
        const queryString = offset ? offset : limit
        const result = await connection.query(`${query}
                    ${offset ? 'OFFSET' : 'LIMIT'} $1`, [queryString])

        return result.rows
    }
    return false
}
