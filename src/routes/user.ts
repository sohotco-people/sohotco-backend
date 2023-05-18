import express from 'express'
import { getMe, getUser, updateMe } from 'controllers/user'
const router = express.Router()

// GET
router.get('/me', getMe)
router.get('/:id', getUser)

// PUT
router.put('/me', updateMe)

export default router
