import connection from "../db.js"

export default async function order(query, req) {
    if (req.query.order) {
        if (req.query.desc === 'true') {
            let { order } = req.query
            order = order.split(';')[0]
            order = `"${order}"`
            const result = await connection.query(`${query}
                        ORDER BY ${order} DESC`)

            return result.rows
        } else {
            let { order } = req.query
            order = order.split(';')[0]
            order = `"${order}"`
            const result = await connection.query(`${query}
                        ORDER BY ${order}`)

            return result.rows
        }
    }
    return false
}
