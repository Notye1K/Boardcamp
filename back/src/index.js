import express, {json} from 'express'
import cors from 'cors'
import routes from './routes/index.js'

const app = express()
app.use(json())
app.use(cors())

app.use(routes)

app.listen(4000, () => {
    console.log('ready')
})