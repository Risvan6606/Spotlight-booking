const express = require('express')
const artistRoute = express()
const artistController = require('../Controllers/artistController')
const artistAuthmiddileware = require('../Middlewares/artistAuthmiddileware')
const session = require('express-session')
const sessionConfig = require('../Config/sessionConfig')

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

module.exports = artistRoute
