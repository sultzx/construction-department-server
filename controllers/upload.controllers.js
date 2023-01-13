
import User from "../models/User.js"

export const uploadAvatar = async (req, res) => {
    const url = `/uploads/avatars/${req.file.originalname}`
    await User.updateOne({
        _id: req.userId
    }, {
        avatarUrl: url
    })
    res.json({
        url: url
    })
}

export const uploadFiles = (req, res) => {
    res.json({
        url: `/uploads/files/${req.file.originalname}`
    })
}