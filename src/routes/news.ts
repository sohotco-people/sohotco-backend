import express from 'express'
import { getMyNews, getNews } from '../controllers/news'

const router = express.Router()

// GET
router.get('/me', getMyNews)
router.get('/:id', getNews)

export default router
