import express from 'express'
import {
  createProject,
  deleteProject,
  getProject,
  getMyProject,
} from '../controllers/project'
const router = express.Router()

// GET
router.get('/me', getMyProject)
router.get('/:id', getProject)

// POST
router.post('/me', createProject)

// DELETE
router.delete('/me', deleteProject)

export default router
