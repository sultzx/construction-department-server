import mongoose from "mongoose"

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String,
    patronymic: String, 
    phone: {
        type: String,
        unique: true,
        default: ''
    },
    address: {
        type: Object,
        apartment: String,
        home: String,
        street: String,
        city: String,
        region: String,
    },
    avatarUrl: String,
    role: {
        type: String,
        required: true,
        default: 'user'
    }
}, {
    timestamps: true
})

export default mongoose.model('User', schema)