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

module.exports = artistRoute
