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
    patronimyc: String,
    phone: String,
    address: String,
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