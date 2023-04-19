import express from 'express'

import checkAuth from '../middlewares/checkAuth.js'

import * as controller from '../controllers/project.controllers.js'

const projectRouter = express.Router()

projectRouter.post('', checkAuth, controller.create)
projectRouter.get('/all', controller.all)
projectRouter.delete('/:id', checkAuth, controller.remove)

export default projectRouter