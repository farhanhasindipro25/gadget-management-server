import cors from 'cors'
import express, { Application, Request } from 'express'
import userRoutes from './app/modules/user/user.routes'

const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
app.use('/api/v1/users', userRoutes)

app.get('/', async (req: Request, res: any) => {
  res.send('Server running successfully!')
})

export default app
