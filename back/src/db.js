import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const connection = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

export default connection
