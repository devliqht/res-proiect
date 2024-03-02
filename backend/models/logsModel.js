const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = Schema({
    studentName: {
        type: String,
        required: true
    },
    studentID: {
        type: Number, 
        required: true
    },
    studentBlocksection: {
        type: String,
        required: true
    },
    logTimeAndDate: {
        type: String,
        required: true
    },
    studentGroup: {
        type: Number,
        required: true
    },
    apparatuses: [{
        apparatus: String
    }]
}, { timestamps: true })

module.exports = mongoose.model('Log', logSchema)