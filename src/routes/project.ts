import express from 'express'
import {
  createProject,
  deleteMyProject,
  getProject,
  getMyProject,
  updateMyProject,
  updatePublishMyProject,
  getProjects,
} from '../controllers/project'
const router = express.Router()

// GET
router.get('/', getProjects)
router.get('/me', getMyProject)
router.get('/:id', getProject)

// POST
router.post('/me', createProject)

// PUT
router.put('/me', updateMyProject)
router.put('/me/publish', updatePublishMyProject)

// DELETE
router.delete('/me', deleteMyProject)

export default router
