const express = require('express')
const adminRoute = express()
const session = require('express-session')
const sessionConfig = require('../Config/sessionConfig')
const upload = require('../Config/multer')

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
adminRoute.post('/get-category-data', adminController.getCategoryData)
// adminRoute.post('/addbanner', adminController.addbanner)
adminRoute.post('/addbanner', upload.upload.single('image'), adminAuthmiddileware, adminController.addbanner)
adminRoute.post('/get-banner-data', adminController.getBannerData)

// update requests
adminRoute.patch('/block-and-unblock', adminController.blockAndUnblock)
adminRoute.patch('/block-and-unblock-artist', adminController.artist_Block_And_Unblock)
adminRoute.patch('/category-list-unlist', adminController.listAndUnlistCategory)
adminRoute.patch('/banner-list-unlist', adminController.bannerListAndUnlist)

module.exports = adminRoute         