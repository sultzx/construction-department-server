import { body } from 'express-validator'

export const registration = [
    body('email', '').isEmail(),
    body('password', '').isLength({ min: 6, max: 16 }).isString()
]

export const login = [
    body('email', '').isEmail(),
    body('password', '').isLength({ min: 6, max: 16 }).isString()
]