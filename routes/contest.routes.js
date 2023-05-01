import express from 'express'

import checkAuth from '../middlewares/checkAuth.js'

import * as controller from '../controllers/contest.controllers.js'

const contestRouter = express.Router()

contestRouter.post('', checkAuth, controller.create)
contestRouter.get('/all', controller.all)
contestRouter.patch('/set', checkAuth, controller.set)

export default contestRouter