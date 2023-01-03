export const uploadAvatar = (req, res) => {
    res.json({
        url: `/uploads/avatars/${req.file.originalname}`
    })
}