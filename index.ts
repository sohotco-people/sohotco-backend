import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'
import router from 'routes'
import { PrismaClient } from '@prisma/client'
import { PORT } from 'utils/constant'

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

const server = http.createServer(app)

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
