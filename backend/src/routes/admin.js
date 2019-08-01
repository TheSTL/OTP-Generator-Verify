import {Router} from 'express'

import{countUniqueNo,totalSms,listUniqueNo,list, login} from '../controller/admin.controller'

const router = Router();

router.get('/countUniqueNo',countUniqueNo)
router.get('/countTotalSms',totalSms)
router.get('/listUniqueNo',listUniqueNo)
router.get('/list',list)
router.post('/login',login)

export default router
