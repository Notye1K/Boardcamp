import connection from '../db.js'
import limitOffset from '../utils/limitOffset.js'
import order from '../utils/order.js'
import printError from '../utils/printError.js'

export async function getGames(req, res) {
    try {
        function query(txt) {
            return `SELECT games.*, categories.name AS "categoryName",
                    COUNT (rentals."gameId") AS "rentalsCount" FROM games
                    LEFT JOIN rentals ON games.id = "gameId"
                    JOIN categories ON games."categoryId"=categories.id
                    ${txt}
                    GROUP BY games.id, categories.name`
        }
        if (req.query.name) {
            const games = await connection.query(query(`
                WHERE games.name LIKE $1 || '%'`), [req.query.name])
            res.send(games.rows)
        }
        else {

            const result = await limitOffset(query(''), req)
            if (result) {
                return res.send(result)
            }

            const orderBy = await order(query(''), req)
            if (orderBy) {
                return res.send(orderBy)
            }

            const games = await connection.query(query(''))
            res.send(games.rows)
        }
    } catch (error) {
        printError(res, error)
    }
}

export async function postGames(req, res) {
    try {
        const { name, image, categoryId } = req.body
        const stockTotal = parseInt(req.body.stockTotal)
        const pricePerDay = parseFloat(req.body.pricePerDay)

        if (stockTotal < 1 || pricePerDay <= 0) {
            return res.status(400).send('stockTotal < 1 || pricePerDay <= 0')
        }

        const id = await connection.query(`SELECT * FROM categories WHERE id=$1`, [categoryId])

        if (id.rows.length === 0) {
            return res.status(400).send('categoryId not found')
        }

        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201)
    } catch (error) {
        printError(res, error)
    }
}
