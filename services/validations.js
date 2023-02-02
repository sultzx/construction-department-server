import { body } from 'express-validator'

export const registration = [
    body('firstname', 'Атыңыз').isLength({ min: 2, max: 30 }).isString(),
    body('email', 'Поштаңыз').isEmail(),
    body('password', 'Құпия сөзіңіз').isLength({ min: 6, max: 16 }).isString()
]

export const login = [
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 24 }).isString()
]

export const updatingProfile = [
    body('firstname').isLength({min: 3}).isString(),
    body('lastname').isLength({min: 3}).isString(),
    body('patronimyc').optional().isString(),
    body('phone').isLength({min: 11}).isString(),
    body('address.home').isLength({min: 1}).isString(),
    body('address.street').isLength({min: 3}).isString(),
    body('address.city').isLength({min: 3}).isString(),
    body('address.region').isLength({min: 3}).isString()
]
    
export const news = [
    body('title').isLength({min: 3}).isString(),
    body('date').optional().isString(),
    body('text').isLength({min: 3}).isString(),
    body('imageUrl').optional().isString()
]

