import express, { Request, Response } from 'express'
import cors from 'cors'
import { router } from './app/routes'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import { notFound } from './app/middlewares/notFound'

const app = express()
// middleware
app.use(express.json())
app.use(cors())

app.get('/', async (req: Request, res: Response) => {
    res.json({ msg: "hello from server" })
})


// user routes
app.use('/api/v1', router)


// global error handler
app.use(globalErrorHandler)

// not found
app.use(notFound)

export default app;