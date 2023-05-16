import express from 'express'
import { getUser, updateMe } from 'controllers/user'
const router = express.Router()

// GET
router.get('/:id', getUser)

// PUT
router.put('/me', updateMe)

export default router
