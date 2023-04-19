
import User from "../models/User.js"
import News from "../models/News.js"
import Company from "../models/Company.js"
import Monitoring from "../models/Monitoring.js"



export const uploadAvatar = async (req, res) => {
    const url = `/uploads/avatars/${req.file.filename}`
    await User.updateOne({
        _id: req.userId
    }, {
        avatarUrl: url
    })
    res.json({
        url: url
    })
}

export const uploadSignature = async (req, res) => {
    const url = `/uploads/signatures/${req.file.filename}`
    await Company.updateOne({
        _id: req.userId
    }, {
        signature: url
    })
    res.json({
        url: url
    })
}

export const uploadMonitoring = async (req, res) => {
    const url = `/uploads/monitorings/${req.file.filename}`
    const id = req.params.id

    console.log(id, req.file.filename)

    const monitoring = await Monitoring.findById(id)

     monitoring.images.push(url)

     await monitoring.save()

    res.json({
        url: url
    })
}

///////////////////////////

export const uploadSeal = async (req, res) => {
    const url = `/uploads/seals/${req.file.filename}`
    await Company.updateOne({
        _id: req.userId
    }, {
        seal: url
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