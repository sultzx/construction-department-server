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
    name: String,
    director: {
        type: Object,
        lastname: String,
        firstname: String,
        patronymic: String,
        signature: String,
    },
    coordinates: {
        type: Object,
        description: String,
        lat: String,
        lng: String,
    },
    phone: String,
    avatarUrl: String,
    signature: String,
    seal: String,
    role: {
        type: String,
        default: 'company'
    },
    category: {
        type: String,
        required: true,
        default: 'contractor'
    }
}, {
    timestamps: true
})

export default mongoose.model('Company', schema)
