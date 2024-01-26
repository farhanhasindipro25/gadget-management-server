import { Application, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import userRoutes from './app/modules/user.routes'

const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
app.use('/api/v1/users', userRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Server running successfully!')
})

export default app
