import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: String,
    text: String,
    category: {
        type: Object,
        id: Number,
        name: String
    },
    begin: Date,
    end: Date,
    coordinates: {
        type: Object,
        lat: Number,
        lng: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
}, {
    timestamps: true
})

export default mongoose.model('Project', schema)