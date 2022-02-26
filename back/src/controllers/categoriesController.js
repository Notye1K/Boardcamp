import connection from '../db.js'
import printError from '../services/printError.js'

export async function getCategories(req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories')

        res.send(categories.rows)
    } catch (error) {
        printError(res, error)
        console.log(1);
    }
}

export async function  postCategories(req, res){
    try {
        const name = await connection.query('SELECT * FROM categories WHERE name=$1', [req.body.name])

        if(name.rows.length !== 0){
            return res.sendStatus(409)
        }

        await connection.query('INSERT INTO categories (name) VALUES ($1)', [req.body.name])
        res.sendStatus(201)
        
    } catch (error) {
        printError(res, error)
        console.log(1);
    }
}
