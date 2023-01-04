export const uploadAvatar = (req, res) => {
    res.json({
        url: `/uploads/avatars/${req.file.originalname}`
    })
}

export const uploadFiles = (req, res) => {
    res.json({
        url: `/uploads/files/${req.file.originalname}`
    })
}