import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.routes'

const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
app.use('/api/v1/users', UserRoutes)

// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger')
// })

app.use(globalErrorHandler)

export default app
