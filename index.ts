import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'
import router from 'routes'
import { PrismaClient } from '@prisma/client'

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(`${__dirname}/.env.prod}`) })
} else {
  dotenv.config({ path: path.join(`${__dirname}/.env.local`) })
}

const app: Express = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(router)

// app.use(routes)
const server = http.createServer(app)
const PORT = process.env.PORT

app.get('/ping', (req: Request, res: Response) =>
  res.json({ message: '/pong' }),
)

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`SERVER POST >> ${PORT}`))
  } catch (err) {
    console.error(`SERVER ERROR >> ${err}`)
    await prisma.$disconnect()
  }
}

start()
