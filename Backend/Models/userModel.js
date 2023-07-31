const { Timestamp } = require('bson')
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: '-1'
    }
}, {
    timestamps: true
})
const userModel = mongoose.model('user', userSchema)
module.exports = userModel;