import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from 'config'

import User from '../models/User.js'

export const registration = async (req, res) => {
    try {
        
        const isEmailExist = await User.findOne({
            email: req.body.email
        })

        if (isEmailExist) {
            return res.status(400).json({
                message: 'Email is already exist'
            })
        }

        const salt = await bcrypt.genSalt(6)
        const hash = await bcrypt.hash(req.body.password, salt)

        const document = new User({
            email: req.body.email,
            hashedPassword: hash
        })

        const user = await document.save()

        const { hashedPassword, ...userData } = user._doc

        const token = jwt.sign({
            _id: user._id
        }, config.get('jwt_key'), {expiresIn: '1h'})

        res.status(200).json({
            token,
            ...userData
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const login =(req, res) => {
    try {
        
    } catch (error) {
        
    }
}