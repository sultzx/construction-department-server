import express from 'express'

import * as controller from '../controllers/news.controllers.js'
import * as validation from '../services/validations.js'
import validationHandler from '../services/validationHandler.js'
import checkAuth from '../middlewares/checkAuth.js'

const newsRouter = express.Router()

newsRouter.get('/all', controller.getAll)
newsRouter.get('/:id', controller.getOne)
newsRouter.post('/', checkAuth, validation.news, validationHandler, controller.create)
newsRouter.patch('/:id', checkAuth, validation.news, validationHandler, controller.update)
newsRouter.delete('/:id', checkAuth, controller.remove)

export default newsRouter