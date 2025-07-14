import express, { Request, Response } from 'express'

const app = express()
// console.log(app);

app.get('/', async (req: Request, res: Response) =>{
    res.json({msg: "hello from server"})
})

export default app;