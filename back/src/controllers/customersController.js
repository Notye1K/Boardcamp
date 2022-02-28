import connection from '../db.js'
import printError from '../services/printError.js'

export async function getCustomers(req, res) {
    try {
        if (req.query.cpf) {
            const customers = await connection.query(`SELECT *, to_char(birthday, 'YYYY-mm-dd') AS birthday FROM customers
                WHERE cpf LIKE $1 || '%'`, [req.query.cpf])
            res.send(customers.rows)
        } else {
            const customers = await connection.query(`SELECT *, to_char(birthday, 'YYYY-mm-dd') AS birthday FROM customers`)
            res.send(customers.rows)
        }
    } catch (error) {
        printError(res, error)
    }
}

export async function getCustomersById(req, res) {
    try {
        const customers = await connection.query(`SELECT *, to_char(birthday, 'YYYY-mm-dd') AS birthday FROM customers
            WHERE id=$1`, [req.params.id])

        if (customers.rows.length === 0) {
            return res.sendStatus(404)
        }
        res.send(customers.rows[0])
    } catch (error) {
        printError(res, error)
    }
}

export async function postCustomers(req, res) {
    try {
        const { name, cpf, birthday, phone } = req.body

        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])

        res.sendStatus(201)
    } catch (error) {
        printError(res, error)
    }
}

export async function putCustomers(req, res) {
    try {
        const { name, cpf, birthday, phone } = req.body

        const id = await connection.query(`SELECT id FROM customers WHERE cpf=$1`, [cpf])

        if (id.rows.length !== 0 && id.rows[0].id !== parseInt(req.params.id)) {
            return res.sendStatus(409)
        }

        await connection.query(`UPDATE customers
            SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE id=$5`, [name, phone, cpf, birthday, req.params.id])

        res.sendStatus(200)
    } catch (error) {
        printError(res, error)
    }
}
