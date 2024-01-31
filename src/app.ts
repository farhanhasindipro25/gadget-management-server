import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import userRoutes from './app/modules/user/user.routes'

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

app.use(globalErrorHandler)

export default app
