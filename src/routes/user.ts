import express from 'express'
import { getMe, getUser, updateMe, deleteMe } from '../../src/controllers/user'
const router = express.Router()

// GET
router.get('/me', getMe)
router.get('/:id', getUser)

// PUT
router.put('/me', updateMe)

// DELETE
router.delete('/me', deleteMe)

export default router
