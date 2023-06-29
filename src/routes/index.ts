import express from 'express'
const router = express.Router()
import userRoute from '../../src/routes/user'
import loginRoute from '../../src/routes/login'
import optionRoute from '../../src/routes/option'
import projectRoute from '../../src/routes/project'
import newsRoute from '../../src/routes/news'

router.use('/user', userRoute)
router.use('/login', loginRoute)
router.use('/option', optionRoute)
router.use('/project', projectRoute)
router.use('/news', newsRoute)

export default router
