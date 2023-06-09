import express, { Express, Request, Response } from 'express'
import http from 'http'
import cors from 'cors'
import router from './src/routes'
import { PrismaClient } from '@prisma/client'
import { CLIENT_URL, PORT } from './src/utils/constant'

const app: Express = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
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
