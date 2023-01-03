import express from 'express'
import multer from 'multer'

import * as controllers from '../controllers/upload.controllers.js'
import checkAuth from '../middlewares/checkAuth.js'

const uploadRouter = express.Router()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads/avatars')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage
})

uploadRouter.post('/avatar', checkAuth, upload.single('image'), controllers.uploadAvatar)


export default uploadRouter