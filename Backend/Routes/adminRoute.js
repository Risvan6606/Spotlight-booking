const express = require('express')
const adminRoute = express()
const session = require('express-session')
const sessionConfig = require('../Config/sessionConfig')

adminRoute.use(session({
    secret: sessionConfig.adminsessionSecrect,
    saveUninitialized: true,
    resave: false
}))
const adminController = require('../Controllers/adminController')
const adminAuthmiddileware = require('../Middlewares/adminAuthmiddleware')

adminRoute.post('/login', adminController.login)
adminRoute.post('/forgotpassword', adminController.forgotPassword)
adminRoute.post('/setpassword', adminController.setPassword)
adminRoute.post('/get-admin-info-by-id', adminAuthmiddileware, adminController.authorization)
adminRoute.post('/get-user-data', adminController.userList)
adminRoute.post('/get-artist-data', adminController.artistList)
adminRoute.post('/addcategory', adminController.addcategory)

// update requests
adminRoute.patch('/block-and-unblock', adminController.blockAndUnblock)
adminRoute.patch('/block-and-unblock-artist', adminController.artist_Block_And_Unblock)

module.exports = adminRoute         