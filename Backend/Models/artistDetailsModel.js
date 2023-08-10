const mongoose = require('mongoose');

// Define the artistDetailsSchema
const artistDetailsSchema = mongoose.Schema({
    artist_id: {
        type: String,
        ref: 'artist',
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    moreDetails: [{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        midBudjet: {
            type: String,
            required: true
        },
        availble: {
            type: String,
            required: true
        },
        discription: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }]
});
const artistMoreDetailsModel = mongoose.model('artistMoreDetail', artistDetailsSchema)
module.exports = artistMoreDetailsModel