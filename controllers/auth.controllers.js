import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from 'config'

import User from '../models/User.js'
import Company from '../models/Company.js'

export const registration = async (req, res) => {
    try {
        
        const { email,  password, firstname } = req.body

        const isEmailExist = await User.findOne({
            email: email
        })

        if (isEmailExist) {
            return res.status(400).json({
                message: 'Қолданушы желіде тіркелген'
            })
        }

        const salt = await bcrypt.genSalt(6)
        const hash = await bcrypt.hash(password, salt)

        const document = new User({
            email: email,
            hashedPassword: hash,
            firstname
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

export const registrationEntity = async (req, res) => {
    try {
        
        const { email,  password, name, phone, category } = req.body

        const isEmailExist = await User.findOne({
            email: email
        })

        if (isEmailExist) {
            return res.status(400).json({
                message: 'Қолданушы желіде тіркелген'
            })
        }

        const salt = await bcrypt.genSalt(6)
        const hash = await bcrypt.hash(password, salt)

        const document = new Company({
            name,
            category,
            email: email,
            phone,
            hashedPassword: hash,
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

export const login = async (req, res) => {
    try {
        
        const { email, password } = req.body

        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return res.status(404).json({
                message: 'Қолданушы желіде жоқ'
            })
        }

        const isPassValid = await bcrypt.compare( password, user._doc.hashedPassword )

        if (!isPassValid) {
            return res.status(400).json({
                message: 'Құпия сөз қате терілген'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.get('jwt_key'), {
            expiresIn: '1h'
        })

        const { hashedPassword, ...userData } = user._doc

        res.status(200).json({
            ...userData,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
 


export const loginEntity = async (req, res) => {
    try {
        
        const { email, password } = req.body

        const user = await Company.findOne({
            email: email
        })

        if (!user) {
            return res.status(404).json({
                message: 'Қолданушы желіде жоқ'
            })
        }

        const isPassValid = await bcrypt.compare( password, user._doc.hashedPassword )

        if (!isPassValid) {
            return res.status(400).json({
                message: 'Құпия сөз қате терілген'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.get('jwt_key'), {
            expiresIn: '1h'
        })

        const { hashedPassword, ...userData } = user._doc

        res.status(200).json({
            ...userData,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const me = async (req, res) => {
    try {

        const userId = req.userId

      let user = ""
  
      if (Boolean(await User.findById(userId))) {
        user = await User.findById(userId)

  
        const { hashedPassword, ...userData } = user._doc;
  
        res.status(200).json(userData);
      }

      if (Boolean(await Company.findById(userId))) {
        user = await Company.findById(userId)

  
        const { hashedPassword, ...userData } = user._doc;
  
        res.status(200).json(userData);
      }

    } catch (err) {
      res.status(500).json({
        message: 'Рұқсат жоқ',
      });
    }
  };

export const update = async (req, res) => {
    try {
        const { firstname, lastname, patronymic, phone, coordinates } = req.body

        await User.updateOne({
            _id: req.userId
        }, {
            firstname: firstname,
            lastname: lastname,
            patronymic: patronymic,
            phone: phone,
            coordinates: {
                description: coordinates.description,
                lat: coordinates.lat,
                lng: coordinates.lng,
            },
        })

        res.status(200).json({
            message: 'Сіздің жеке мәліметіңіз сәтті өзгерді'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const updateEntity = async (req, res) => {
    try {
        const { name, phone, director, coordinates } = req.body

        await Company.updateOne({
            _id: req.userId
        }, {
            name: name,
            phone: phone,
            director: director,
            coordinates: {
                description: coordinates.description,
                lat: coordinates.lat,
                lng: coordinates.lng,
            },
        })

        res.status(200).json({
            message: 'Сіздің жеке мәліметіңіз сәтті өзгерді'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const deleteAvatar = async (req, res) => {
    try {
        await User.updateOne({
            _id: req.userId
        }, {
            avatarUrl: ''
        })
        res.status(200).json({success: true})
    } catch (error) {
        res.status(500).json({
            message: 'Профиль суретін өшіру кезінде қате шықты'
        })
    }
}