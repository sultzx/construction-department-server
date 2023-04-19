import express from 'express'

import checkAuth from '../middlewares/checkAuth.js'

import * as controller from '../controllers/monitoring.controllers.js'

const monitoringRouter = express.Router()

monitoringRouter.post('', checkAuth, controller.create)
monitoringRouter.get('/all', controller.all)
monitoringRouter.delete('/:id', checkAuth, controller.remove)

export default monitoringRouter