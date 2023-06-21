import express from 'express'
import {
  getMe,
  getUser,
  updateMe,
  deleteMe,
  getUsers,
  createProposal,
} from '../../src/controllers/user'
const router = express.Router()

// GET
router.get('/me', getMe)
router.get('/:id', getUser)
router.get('/', getUsers)

// PUT
router.put('/me', updateMe)

// DELETE
router.delete('/me', deleteMe)

// POST
router.post('/:user_id/project/:project_id/propose', createProposal)

export default router
