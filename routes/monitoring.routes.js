import express from 'express'

import checkAuth from '../middlewares/checkAuth.js'

import * as controller from '../controllers/monitoring.controllers.js'

const monitoringRouter = express.Router()

monitoringRouter.post('', checkAuth, controller.create)
monitoringRouter.get('/all', controller.all)
monitoringRouter.delete('/:id', checkAuth, controller.remove)
monitoringRouter.patch('/:id/set-status', checkAuth, controller.setStatus)

export default monitoringRouter