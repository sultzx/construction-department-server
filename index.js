import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'

import authRouter from './routes/auth.routes.js'

const app = express()

const PORT = config.get('port.1') || config.get('port.2')

app.use(express.json())

app.use(cors())

const start = async () => {
    try {
        await mongoose.set('strictQuery', true)
        await mongoose.connect(config.get('mongodb.url'))
        console.log(`database OK\tname: ${mongoose.connection.name}`)
    } catch (error) {
        console.log(`database ERROR\tcodename: ${error.codeName}`)
    }

    app.use('/api/auth', authRouter)
    // app.use

    app.listen(PORT, (error) => {
        if(error) {
            console.log(`server ERROR`)
        }
        console.log(`server OK\tport: ${PORT}`)
    })
}

start()
