const artistModel = require('../Models/artistModel')
const bcrypt = require('bcrypt')
const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken')

// otp generation
const otpGenerate = () => {
    const otp = Math.floor(Math.random() * 9000) + 1000
    return otp
}
// mail sending function
const sendVerifyMail = async (name, email, otp) => {
    try {
        const subOtp = otp.toString()
        console.log(otp)
        const trasporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        })
        const mailOptions = {
            from: process.env.email,
            to: email,
            subject: 'For verifation mail',
            html: `<p>hi${name} this is your otp${otp}`
        }
        trasporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error.message + '1')
            } else {
                console.log('email has send', info.response)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}
// pasword hashing
const sequirePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error.message)
    }
}
// sign Up
const signUp = async (req, res) => {
    try {
        const otpData = await artistModel.findOne({ otp: req.body.otp })
        if (otpData) {
            await artistModel.updateOne({ email: req.body.email }, { $set: { otp: 'isVerified' } })
            return res.status(200).send({ message: 'Registration success', success: 'isVerified' })
        }
        if (req.body.firstName.trim().length === 0) {
            return res.status(200).send({ message: 'Space not allowed', success: 'name_space' })
        } else if (req.body.lastName.trim().length === 0) {
            return res.status(200).send({ message: 'Space not allowed', success: 'last_name' })
        } else if (req.body.mobile.trim().length === 0 || req.body.mobile.length < 9 || req.body.mobile.length > 10) {
            return res.status(200).send({ message: 'please enter valid mobile number', success: 'number_valid' })
        } else if (req.body.password.trim().length === 0) {
            return res.status(200).send({ message: 'Space not allowed', success: 'password_space' })
        } else {
            const Exist = await artistModel.findOne({ email: req.body.email })
            if (Exist) {
                return res.status(200).send({ message: 'Email already Exist please check your email', success: 'Exist' })
            }
            const fullName = req.body.firstName.concat(' ', req.body.lastName)
            const otp = otpGenerate()
            sendVerifyMail(fullName, req.body.email, otp)
            const subOtp = otp.toString()
            const passwordHash = await sequirePassword(req.body.password)
            req.body.password = passwordHash
            const newArtist = new artistModel(req.body)
            const test = await newArtist.save();
            const sample = await artistModel.updateOne({ email: req.body.email }, { $set: { otp: otp } })
            res.status(200).send({ message: 'Opt sended your mail', success: true, otp: subOtp })
        }
    } catch (error) {
        res.status(500).send({ message: 'Registration Failed', success: false })
    }
}
const login = async (req, res) => {
    try {
        const user = await artistModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: 'User not exist please sign Up ', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'Password incorrect please check', success: false })
        }
        if (user.otp === 'isVerified') {
            const token = jwt.sign({ id: user._id }, process.env.artist_Secrect_key, {
                expiresIn: "1d"
            })
            res.status(200).send({ message: 'Login successfull', success: true, data: token })
        } else {
            res.status(200).send({ message: 'please sign up ', success: false })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error logged in ', success: false, error })
    }
}
const authorization = async (req, res) => {
    try {
        const artist = await artistModel.findOne({ _id: req.body.artistId })
        if (!artist) {
            return res
                .status(200).send({ message: 'Artist does not Exist', success: false })
        } else {
            res.status(200).send({
                success: true, data: {
                    name: artist.firstName,
                    email: artist.email
                }
            })
        }
    } catch (error) {
        res.status(500)
            .send({ message: 'Error getting user info', success: false, error })
    }
}
const forgotPassword = async (req, res) => {
    try {
        if (req.body.otp === false) {
            const artist = await artistModel.findOne({ email: req.body.email })
            if (!artist) {
                return res.status(200)
                    .send({ message: 'Invalid Email', success: false })
            }
            const otp = otpGenerate()
            const fullName = artist.firstName.concat(' ', artist.lastName)
            sendVerifyMail(fullName, req.body.email, otp)
            const otps = otp.toString()
            req.session.email = req.body.email
            res.status(200).send({ message: 'OTP has been sended .please chck your mail', success: true, otp: otps })
        }
    } catch (error) {
        res.status(500).send({ message: 'Forgot password fail', success: false, error })
    }
}
const setPassword = async (req, res) => {
    try {
        // console.log(req.body)
        // console.log(req.session.email)
        if (req.body.password === req.body.conPassword) {
            const passwordHash = await sequirePassword(req.body.password)
            await artistModel.updateOne({ email: req.session.email }, { $set: { password: passwordHash, otp: 'isVerified' } })
            return res.status(200).send({ message: 'Password Updated', success: true })
        }
        res.status(200).send({ message: 'There are different password please check', success: false })
    } catch (error) {
        res.status(500).send({ message: 'somthing went worng please check', error })
    }
}

module.exports = {
    signUp,
    login,
    authorization,
    forgotPassword,
    setPassword
}