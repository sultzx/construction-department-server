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
    coordinates: {
        type: Object,
        description: String,
        lat: String,
        lng: String,
    },
    phone: String,
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
