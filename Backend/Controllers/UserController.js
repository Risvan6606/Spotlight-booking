const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken')

// otp generating

const otpGenerate = () => {
    const otp = Math.floor(Math.random() * 9000) + 1000
    return otp
}
// mail send
// var otps;
const sendVerifyMail = async (name, email) => {
    try {
        const otp = otpGenerate()
        const subOtp = otp.toString()
        await userModel.updateOne({ email: email }, { $set: { otp: subOtp } })
        console.log(subOtp, 'sendle')
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
            html: `<p>Hi ${name} this is your otp${otp}`
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

// registration
// const signUp = async (req, res) => {
//     try {
//         if (req.body.otp == otps && req.body.otp) {
//             const password = req.body.password;
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);
//             req.body.password = hashedPassword;
//             const newUser = new userModel(req.body);
//             await newUser.save();
//             return res.status(200).send({ message: 'signUp has been success full', success: true })
//         } else if (req.body.otp !== undefined && req.body.otp !== otps) {
//             return res.status(200).send({ message: 'otp is inccorect', success: 'inccorect' })
//         }
//         const userExist = await userModel.findOne({ email: req.body.email });
//         if (userExist) {
//             return res.status(200).send({ message: 'User already exists', success: false });

//         } else if (req.body.first_name.trim().length === 0 ||
//             req.body.last_name.trim().length === 0 ||
//             req.body.mobile.trim().length === 0 ||
//             req.body.password.trim().length === 0) {
//             return res.status(200).send({ message: 'Space not allowed ', success: 'space' })
//         } else if (req.body.mobile.length < 10 || req.body.mobile.length > 10) {
//             return res.status(200).send({ message: 'Please Enter valid mobile Nomber', success: 'mobile' })
//         }
//         const fullName = req.body.first_name.concat(' ', req.body.last_name)
//         sendVerifyMail(fullName, req.body.email)
//         res.status(200).send({ message: 'Otp has send', success: 'otp' });
//     } catch (error) {
//         console.log('Error occurred while creating user:', error);
//         res.status(500).send({ message: 'Error creating user', success: false });
//     }
// };
const signUp = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (user) {
            return res.status(200)
                .send({ message: 'User already Exist ', success: false })
        }
        if (req.body.first_name.trim().length === 0 ||
            req.body.last_name.trim().length === 0 ||
            req.body.mobile.trim().length === 0 ||
            req.body.password.trim().length === 0) {
            return res.status(200).send({ message: 'space not allowed', success: false })
        } else if (req.body.mobile.length < 10 || req.body.mobile.length > 10) {
            return res.status(200).send({
                message: 'Please Enter valid mobile Nomber', success: false
            })
        } else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newUser = new userModel(req.body);
            await newUser.save();
            const fullName = req.body.first_name.concat(' ', req.body.last_name)
            sendVerifyMail(fullName, req.body.email)
            res.status(200).send({
                message: 'Otp has send', success: true
            });
        }
    } catch (error) {
        res.status(500).send({ message: 'sothing went wrong', success: false })
    }
}
const otp = async (req, res) => {
    try {
        const userOtp = await userModel.findOne({ otp: req.body.otp })
        if (!userOtp) {
            return res.status(200).send({ message: 'Otp has inccrect please check', succss: false })
        }
        await userModel.updateOne({ otp: req.body.otp }, { $set: { otp: 'isVerified' } });
        res.status(200).send({ message: 'Registration successfull ', success: true })
    } catch (error) {
        res.status(500).send({ message: 'somthing went worng', success: false })
    }
}



// Login
const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res
                .status(200).send({ message: 'User Does not exist', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res
                .status(200).send({ message: "Password is incorrect", success: false })
        } else {
            if (user.otp === 'isVerified') {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                    expiresIn: "1d"
                })
                res.status(200).send({ message: "Login SuccessFull", success: true, data: token })
            } else {
                res.status(200).send({ message: 'you are in Blocked', success: false })
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error logged in", success: false, error })
    }
}
// forgot password
const forgot = async (req, res) => {
    try {
        const user = await userModel.findOne({ mobile: req.body.mobile })
        if (!user) {
            return res
                .status(200).send({ message: 'User Not exist', success: false })
        } else {
            req.session.mobile = req.body.mobile
            res
                .status(200).send({ message: 'User exist', success: true })

        }
    } catch (error) {
        res.status(500).send({ message: 'Error forgot', success: false, error })
    }
}
const sequirePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error.message)
    }
}
const setPassword = async (req, res) => {
    try {
        // console.log(req.body.password)
        // console.log(req.body.conPassword)
        // console.log(req.session.mobile)
        if (req.body.password === req.body.conPassword && req.body.password.trim().length !== 0) {
            console.log(req.session.mobile);
            const passwordHash = await sequirePassword(req.body.password)
            await userModel.updateOne({ mobile: req.session.mobile }, { $set: { password: passwordHash } })
            res.status(200).send({ message: 'Password has been updated', success: true })
        } else {
            res.status(200).send({ message: 'password updation faild please try again', success: false })
        }
    } catch (error) {
        res.status(500).send({ message: 'Password updation  faild', success: false, error })
    }
}

const authorization = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        if (!user) {
            return res
                .status(200).send({ message: 'user does not Exist', success: false })
        } else {
            res.status(200).send({
                success: true, data: {
                    name: user.first_name,
                    email: user.email
                }
            })
        }
    } catch (error) {
        res.status(500)
            .send({ message: 'Error getting user info', success: false, error })
    }
}

module.exports = {
    signUp,
    login,
    authorization,
    forgot,
    setPassword,
    otp
};


