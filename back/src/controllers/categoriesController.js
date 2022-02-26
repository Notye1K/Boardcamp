import connection from '../db.js'
import printError from '../services/printError.js'

export async function getCategories(req, res) {
    try {
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
