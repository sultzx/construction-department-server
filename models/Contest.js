import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: String,
    text: String,
    deadline: Date,
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
}, {timestamps: true})

export default mongoose.model('Contest', schema)