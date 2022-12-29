import express from 'express'

import * as controller from '../controllers/auth.controllers.js'

const authRouter = express.Router()

authRouter.post('/registration', controller.registration)
authRouter.post('/login', controller.login)

export default authRouter