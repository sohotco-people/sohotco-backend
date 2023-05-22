import express from 'express'
import { oauthLogin } from '../../src/controllers/login'
const router = express.Router()

// GET
router.get('/oauth', oauthLogin)

export default router
