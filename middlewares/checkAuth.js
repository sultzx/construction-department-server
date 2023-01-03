import jwt from 'jsonwebtoken'

import config from 'config'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, config.get('jwt_key'))
            req.userId = decoded._id
            next()
        } catch (error) {
            res.status(403).json({
                message: 'Рұқсат жоқ!'
            })
        }
    } else {
        res.status(403).json({
            message: 'Рұқсат жоқ!'
        })
    }
}