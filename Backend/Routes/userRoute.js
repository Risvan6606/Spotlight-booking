const userController = require('../Controllers/UserController')
const express = require('express')
const authMiddileware = require('../Middlewares/authMiddileware')
const userModel = require('../Models/userModel')
const userRoute = express()
const session = require('express-session')
const sessionConfig = require('../Config/sessionConfig')
const upload = require('../Config/userMulter')
userRoute.use(session({
    secret: sessionConfig.sessionScrect,
    saveUninitialized: true,
    resave: false
}))

// sign Up and login 
userRoute.post('/signup', userController.signUp)
userRoute.post('/login', userController.login)
userRoute.post('/otp', userController.otp)
userRoute.post('/forgot', userController.forgot)
userRoute.post('/setpassword', userController.setPassword)
userRoute.post('/get-user-info-by-id', authMiddileware, userController.authorization)
userRoute.post('/user_profiledata', authMiddileware, userController.profile)
userRoute.post('/edit-profile', upload.upload.single('image'), authMiddileware, userController.editProfile)
// 
userRoute.post('/get-home-banner-data', authMiddileware, userController.getBannerData)
userRoute.post('/get-artist-data', authMiddileware, userController.getArtstMoreData)
userRoute.post('/artist-view', authMiddileware, userController.aritsView)
userRoute.post('/bookartist', authMiddileware, userController.aritistBooking)
userRoute.post('/notifications', authMiddileware, userController.userNotification)
userRoute.post('/confirm_booking_data', authMiddileware, userController.confirmBookingData)
userRoute.post('/advance-payment', authMiddileware, userController.advancePayment)

userRoute.post('/varifiy-payment', authMiddileware, userController.verifyPayment)

userRoute.get('/get-booking-data', authMiddileware, userController.bookingData)


module.exports = userRoute   