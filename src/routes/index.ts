import express from 'express'
const router = express.Router()
import userRoute from 'routes/user'
import loginRoute from 'routes/login'

router.use('/user', userRoute)
router.use('/login', loginRoute)

export default router
