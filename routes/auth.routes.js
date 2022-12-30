import express from 'express'

import * as controller from '../controllers/auth.controllers.js'
import * as validation from '../services/validations.js'
import validationHandler from '../services/validationHandler.js'

const authRouter = express.Router()

authRouter.post('/registration', validation.registration, validationHandler, controller.registration)
authRouter.post('/login', validation.login, validationHandler, controller.login)

export default authRouter