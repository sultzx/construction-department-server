import express from 'express'
import multer from 'multer'

import * as controllers from '../controllers/upload.controllers.js'
import checkAuth from '../middlewares/checkAuth.js'
import storageService from '../services/diskStorage.js'

const uploadRouter = express.Router()

const uploadAvatar = multer({
    storage: storageService('avatars')
})

const uploadFile = multer({
    storage: storageService('files')
})

uploadRouter.post('/avatar', checkAuth, uploadAvatar.single('image'), controllers.uploadAvatar)
uploadRouter.post('/files', checkAuth, uploadFile.single('image'), controllers.uploadFiles)

export default uploadRouter