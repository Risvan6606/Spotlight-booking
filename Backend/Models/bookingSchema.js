const mongoose = require('mongoose')
const bookingSchema = mongoose.Schema({
    user_id: {
        type: String,
        ref: 'user',
        required: true
    },
    artist_id: {
        type: String,
        required: true
    },
    orders: [{
        firstName: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            default: 'pending'
        }
    }]
}, {
    timestamps: true
});
const bookingModel = mongoose.model('booking', bookingSchema)
module.exports = bookingModel