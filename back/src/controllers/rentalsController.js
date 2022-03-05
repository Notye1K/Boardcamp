import connection from "../db.js"
import printError from '../utils/printError.js'
import dayjs from 'dayjs'
import limitOffset from "../utils/limitOffset.js"
import order from "../utils/order.js"

export async function getRentals(req, res) {
    try {
        const query = `SELECT rentals.*, to_char("rentDate", 'YYYY-mm-dd') AS "rentDate", to_char("returnDate", 'YYYY-mm-dd') AS "returnDate",
            customers.id AS id_c, customers.name AS name_c,
            games.id AS id_g, games.name AS name_g, games."categoryId", categories.name AS name_cate
            FROM rentals
                JOIN customers ON customers.id="customerId"
                JOIN games ON games.id="gameId"
                JOIN categories ON games."categoryId"=categories.id`

        const limit = await limitOffset(query, req)
        if(limit){
            const result = limit.map(rentalsFormat)
            return res.send(result)
        }

        const orderBy = await order(query, req)
        if(orderBy){
            const result = orderBy.map(rentalsFormat)
            return res.send(result)
        }

        if (req.query.customerId && !isNaN(req.query.customerId)) {
            const rentals = await connection.query(`${query} WHERE "customerId"=$1`, [parseInt(req.query.customerId)])

            const result = rentals.rows.map(rentalsFormat)

            res.send(result)
        } else if (req.query.gameId && !isNaN(req.query.gameId)) {
            const rentals = await connection.query(`${query} WHERE "gameId"=$1`, [parseInt(req.query.gameId)])

            const result = rentals.rows.map(rentalsFormat)

            res.send(result)
        } else {
            const rentals = await connection.query(query)

            const result = rentals.rows.map(rentalsFormat)

            res.send(result)
        }
    } catch (error) {
        printError(res, error)
    }
}

function rentalsFormat(rentals) {
    const customer = { id: rentals.id_c, name: rentals.name_c }
    const game = { id: rentals.id_g, name: rentals.name_g, categoryId: rentals.categoryId, categoryName: rentals.name_cate }
    const { id_c, name_c, id_g, name_g, categoryId, name_cate, ...rest } = rentals
    const obj = { ...rest, customer, game }
    return obj
}

export async function postRentals(req, res) {
    try {
        const { customerId, gameId, daysRented } = req.body

        if (daysRented === 0) {
            return res.status(400).send('daysRented must be > 0')
        }

        const game = await connection.query(`SELECT "pricePerDay", "stockTotal" FROM games
            WHERE id=$1`, [gameId])

        let price

        if (game.rows.length === 0) {
            return res.status(400).send('gamerId not found')
        } else if (game.rows.stockTotal < 1) {
            return res.status(400).send('missing stock')
        } else {
            price = game.rows[0].pricePerDay
        }

        const customer_id = await connection.query(`SELECT id FROM customers
            WHERE id=$1`, [customerId])

        if (customer_id.rows.length === 0) {
            return res.status(400).send('customerId not found')
        }

        const originalPrice = price * daysRented

        const rentDate = dayjs().format("YYYY-MM-DD")

        await connection.query(`INSERT INTO rentals
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $4, $3, null, ${originalPrice}, null)`, [customerId, gameId, daysRented, rentDate])

        res.sendStatus(201)
    } catch (error) {
        printError(res, error)
    }
}

export async function leaseCompletion(req, res) {
    try {
        const id = req.params.id

        const { rows: [rental] } = await connection.query(`SELECT "gameId", "rentDate", "daysRented", "returnDate" FROM rentals
            WHERE id=$1`, [id])

        if (rental.returnDate !== null) {
            return res.status(400).send('rent already finished')
        }

        const { rows: [{ pricePerDay }] } = await connection.query(`SELECT "pricePerDay" FROM games
            WHERE id=${rental.gameId}`)

        const returnDate = dayjs().format("YYYY-MM-DD")
        const delayDays = dayjs(returnDate).diff(dayjs(rental.rentDate), 'day') - rental.daysRented
        const delayFee = delayDays > 0 ? pricePerDay * delayDays : null
        await connection.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=${delayFee}
            WHERE id=${id}`, [returnDate])

        res.sendStatus(200)
    } catch (error) {
        printError(res, error)
    }
}

export async function deleteRental(req, res) {
    try {
        const id = req.params.id

        const { rows: [{ returnDate }] } = await connection.query(`SELECT "returnDate" FROM rentals
            WHERE id=$1`, [id])

        if (returnDate !== null) {
            return res.status(400).send('rent already finished')
        }

        await connection.query(`DELETE FROM rentals
            WHERE id=$1`, [id])

        res.sendStatus(200)
    } catch (error) {
        printError(res, error)
    }
}
