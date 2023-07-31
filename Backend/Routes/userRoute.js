const userController = require('../Controllers/UserController')
const express = require('express')
const authMiddileware = require('../Middlewares/authMiddileware')
const userModel = require('../Models/userModel')
const userRoute = express()
const session = require('express-session')
const sessionConfig = require('../Config/sessionConfig')

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

module.exports = userRoute