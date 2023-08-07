const mongoose = require('mongoose')
const notificationSchema = mongoose.Schema({
    user_id: {
        type: String,
        ref: 'user',
        required: true
    },
    artist_id: {
        type: String,
        required: true
    },
    notifications: [{
        name: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        }
    }]
}, {
    capped: { size: 1024, max: 5 },
})
const notificationModel = mongoose.model('notification', notificationSchema)
module.exports = notificationModel
