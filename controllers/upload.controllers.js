
import User from "../models/User.js"
import News from "../models/News.js"

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
 
export const uploadNewsImages = async (req, res) => {
    const url = `/uploads/newspaper/${req.file.originalname}`
    const id = JSON.parse(JSON.stringify(req.body)).id
    
    if (id) {
         await News.updateOne({
        _id: id
        }, {
            imageUrl: `http://localhost:4444${url}`
        })
    }

    res.json({
        url: url
    })
}  