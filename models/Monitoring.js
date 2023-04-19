import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: String,
    description: String,
    images: [{
        type: String
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    demander: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    submitter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    }, 
    deadline: Date,
    status: {
        type: String,
        default: 'checking'
    }
}, {
    timestamps: true
})

export default mongoose.model('Monitoring', schema)