import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from 'config'

import User from '../models/User.js'

export const registration = async (req, res) => {
    try {
        
        const { email,  password, firstname, lastname, patronymic, phone,
           address
        } = req.body

        const isEmailExist = await User.findOne({
            email: email
        })

        if (isEmailExist) {
            return res.status(400).json({
                message: 'Email is already exist'
            })
        }

        const salt = await bcrypt.genSalt(6)
        const hash = await bcrypt.hash(password, salt)

        const document = new User({
            email: email,
            hashedPassword: hash,
            firstname,
            lastname,
            patronymic,
            phone,
            address
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

export const me = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }
  
      const { passwordHash, ...userData } = user._doc;
  
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Нет доступа',
      });
    }
  };

export const update = async (req, res) => {
    try {
        const { firstname, lastname, patronymic, phone, address } = req.body

        await User.updateOne({
            _id: req.userId
        }, {
            firstname: firstname,
            lastname: lastname,
            patronymic: patronymic,
            phone: phone,
            address: {
                home: address.home,
                street: address.street,
                city: address.city,
                region: address.region
            }
        })

        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}