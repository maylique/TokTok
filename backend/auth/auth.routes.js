import express from 'express'
import { userLogin, userLogout } from './auth.controller.js'
import multer from 'multer'
const router = express.Router()
const mult = multer()

router.post('/login',mult.none(),userLogin )
router.post('/logout', userLogout)

export default router