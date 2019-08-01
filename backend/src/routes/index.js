import {Router} from 'express'
import PhoneRouter from './phone'
import AdminRouter from './admin'

const router = Router();

router.use('/phone',PhoneRouter)
router.use('/admin',AdminRouter)

export default router
