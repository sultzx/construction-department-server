import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    text: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.model('News', schema)