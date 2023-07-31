const adminModel = require('../Models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const userModel = require('../Models/userModel')

const sequirePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error.message)
    }
}
// otp generation

const otpGenerate = () => {
    const otp = Math.floor(Math.random() * 9000) + 1000
    return otp
}
// mail sending function

const sendVerifyMail = async (name, email, otp) => {
    try {
        // const subOtp = otp.toString()
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
const login = async (req, res) => {
    try {
        // const passwordHash = await sequirePassword(req.body.password)
        // req.body.password = passwordHash
        // const newUser = new adminModel(req.body)
        // newUser.save()
        const admin = await adminModel.findOne({ email: req.body.email })
        if (!admin) {
            return res.status(200).send({ message: 'User Does not exist', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, admin.password)
        if (!isMatch) {
            return res.status(200)
                .send({ message: 'password inccorect please check', success: false })
        }
        const token = jwt.sign({ id: admin._id }, process.env.admin_Secret_key, {
            expiresIn: "1d"
        })
        res.status(200).send({ message: 'Login successfull', success: true, data: token })
    } catch (error) {
        res.status(500).send({ message: 'Error logged in', success: false, error })
    }
}
const authorization = async (req, res) => {
    try {
        const admin = await adminModel.findOne({ _id: req.body.adminId })
        if (!admin) {
            console.log('notExist')
            return res.status(200)
                .send({ message: 'admin does not Exist', success: false })
        } else {
            res.status(200)
                .send({
                    success: true, data: {
                        name: admin.name,
                        email: admin.email
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
            const admin = await adminModel.findOne({ email: req.body.email })
            if (!admin) {
                return res.status(200)
                    .send({ message: 'Invalid Email', success: false })
            }
            const otp = otpGenerate()
            sendVerifyMail(admin.name, req.body.email, otp)
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
        if (req.body.password === req.body.conPassword) {
            const passwordHash = await sequirePassword(req.body.password)
            await adminModel.updateOne({ email: req.session.email }, { $set: { password: passwordHash } })
            return res.status(200).send({ message: 'Password Updated', success: true })
        }
        res.status(200).send({ message: 'There are different password please check', success: false })
    } catch (error) {
        res.status(500).send({ message: 'somthing went worng please check', error })
    }
}
const userList = async (req, res) => {
    try {
        const userData = await userModel.find()
        if (!userData) {
            return res.status(200)
                .send({ message: 'Not availble user', success: false })
        }
        res.status(200).send({ message: 'Users', success: true, data: userData })
    } catch (error) {
        res.status(500).send({ message: 'somthing went worng', error })
    }
}
const blockAndUnblock = async (req, res) => {
    try {
        if (req.body.email) {
            const unBlocked = await userModel.findByIdAndUpdate(req.body.id, { otp: 'isVerified' })
            if (unBlocked) {
                const userData = await userModel.find()
                return res.status(200).send({ message: 'user are Unblocked', success: true, data: userData })
            }
        } else {
            const statusUpdated = await userModel.findByIdAndUpdate(req.body.id, { otp: 'Blocked' })
            if (statusUpdated) {
                const userData = await userModel.find()
                res.status(200).send({ message: 'User are Blocked', success: true, data: userData })
            }
        }
    } catch (error) {
        res.status(500).send({ message: 'somthing went wrongs', error })
    }
}

module.exports = {
    login,
    authorization,
    forgotPassword,
    setPassword,
    userList,
    blockAndUnblock
}