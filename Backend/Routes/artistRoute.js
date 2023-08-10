const express = require('express')
const artistRoute = express()
const artistController = require('../Controllers/artistController')
const artistAuthmiddileware = require('../Middlewares/artistAuthmiddileware')
const session = require('express-session')
const sessionConfig = require('../Config/sessionConfig')
const upload = require('../Config/multer')

artistRoute.use(session({
    secret: sessionConfig.artistsessionSecrect,
    saveUninitialized: true,
    resave: false
}))

artistRoute.post('/signup', artistController.signUp)
artistRoute.post('/login', artistController.login)
artistRoute.post('/forgotpassword', artistController.forgotPassword)
artistRoute.post('/setpassword', artistController.setPassword)
artistRoute.post('/get-artist-info-by-id', artistAuthmiddileware, artistController.authorization)
artistRoute.post('/artist-more-details', upload.upload.single('image'), artistAuthmiddileware, artistController.artistMoreDetails)
artistRoute.post('/get-artisthome-banner-data', artistAuthmiddileware, artistController.getBannerData)
artistRoute.post('/get-notification-data', artistAuthmiddileware, artistController.notificationData)
artistRoute.post('/get-booking-data', artistAuthmiddileware, artistController.bookingDatas)
artistRoute.post('/accept_and_reject', artistAuthmiddileware, artistController.acceptAndReject)
// artistRoute.post('/get-all-booking-datas', artistAuthmiddileware, artistController.allBookings)



module.exports = artistRoute
