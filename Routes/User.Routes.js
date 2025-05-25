import express from 'express'
import * as UserController from '../Controllers/User.Controller.js'
const router=express.Router()

router.post('/auth/registeration',UserController.register)
router.post('/auth/login',UserController.login)
router.get('/users/profiles',UserController.Profile)
router.put('/users/profiles',UserController.UpdateProfile)

export default router;