import {Router} from 'express'
import {sendOtp,verify} from '../controller/phone.controller'

const router = Router();

router.route('/sendOtp')
.post(sendOtp)

router.route('/verify')
.post(verify)



export default router
