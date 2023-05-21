import express from 'express'
const router = express.Router()
import userRoute from 'routes/user'
import loginRoute from 'routes/login'
import optionRoute from 'routes/option'

router.use('/user', userRoute)
router.use('/login', loginRoute)
router.use('/option', optionRoute)

export default router
