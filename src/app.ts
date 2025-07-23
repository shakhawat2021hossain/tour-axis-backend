import './app/config/passport'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { router } from './app/routes'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import { notFound } from './app/middlewares/notFound'
import cookieParser from 'cookie-parser'
import passport from 'passport';
import expressSession from "express-session";

const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', async (req: Request, res: Response) => {
    res.json({ msg: "hello from server" })
})


// routes
app.use('/api/v1', router)


// global error handler
app.use(globalErrorHandler)

// not found
app.use(notFound)

export default app;