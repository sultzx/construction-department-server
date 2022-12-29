import express from 'express'

import * as controller from '../controllers/auth.controllers.js'
import * as validation from '../services/validations.js'
import handleValidations from '../services/handleValidations.js'

const authRouter = express.Router()

authRouter.post('/registration', validation.registration, handleValidations, controller.registration)
authRouter.post('/login', validation.login, handleValidations, controller.login)

export default authRouter