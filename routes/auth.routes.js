import express from 'express'

import * as controller from '../controllers/auth.controllers.js'
import * as validation from '../services/validations.js'
import validationHandler from '../services/validationHandler.js'
import checkAuth from '../middlewares/checkAuth.js'

const authRouter = express.Router()

authRouter.post('/registration/for-individual', validation.registration, validationHandler, controller.registration)
authRouter.post('/registration/for-entity', validation.registrationEntity, validationHandler, controller.registrationEntity)
authRouter.post('/login/for-individual', validation.login, validationHandler, controller.login)
authRouter.post('/login/for-entity', validation.login, validationHandler, controller.loginEntity)
authRouter.get('/me', checkAuth, controller.me)
authRouter.patch('/update-individual-profile', checkAuth,  controller.update)
authRouter.patch('/update-entity-profile', checkAuth,  controller.updateEntity)

authRouter.patch('/delete-avatar', checkAuth, controller.deleteAvatar)
export default authRouter