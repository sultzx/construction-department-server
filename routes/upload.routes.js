import express from 'express'
import multer from 'multer'

import * as controllers from '../controllers/upload.controllers.js'
import checkAuth from '../middlewares/checkAuth.js'
import storageService from '../services/diskStorage.js'

const uploadRouter = express.Router()

const uploadAvatar = multer({
    storage: storageService('avatars')
})

const uploadSignature = multer({
    storage: storageService('signatures')
})

const uploadMonitoring = multer({
    storage: storageService('monitorings')
})


const uploadSeals = multer({
    storage: storageService('seals')
})

const uploadFile = multer({
    storage: storageService('files')
})

const uploadNewsImage = multer({
    storage: storageService('newspaper')
})

uploadRouter.post('/avatar', checkAuth, uploadAvatar.single('image'), controllers.uploadAvatar)
uploadRouter.post('/signature', checkAuth, uploadSignature.single('image'), controllers.uploadSignature)
uploadRouter.post('/monitoring/:id', checkAuth, uploadMonitoring.single('image'), controllers.uploadMonitoring)
// uploadRouter.post('/seal', checkAuth, uploadSeals.single('image'), controllers.)
uploadRouter.post('/files', checkAuth, uploadFile.single('image'), controllers.uploadFiles)
uploadRouter.post('/newspaper', checkAuth, uploadNewsImage.single('image'), controllers.uploadNewsImages)

export default uploadRouter