import connection from '../db.js'
import limitOffset from '../utils/limitOffset.js'
import order from '../utils/order.js'
import printError from '../utils/printError.js'

export async function getCategories(req, res) {
    try {

        const result = await limitOffset('SELECT * FROM categories', req)
        if (result) {
            return res.send(result)
        }

        const orderBy = await order('SELECT * FROM categories', req)
        if (orderBy) {
            return res.send(orderBy)
        }

        const categories = await connection.query('SELECT * FROM categories')

        res.send(categories.rows)
    } catch (error) {
        printError(res, error)
    }
}

export async function postCategories(req, res) {
    try {

        await connection.query('INSERT INTO categories (name) VALUES ($1)', [req.body.name])
        res.sendStatus(201)

    } catch (error) {
        printError(res, error)
    }
}
