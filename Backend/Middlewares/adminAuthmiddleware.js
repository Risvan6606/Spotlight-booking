const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token, process.env.admin_Secret_key, (err, decoded) => {
            if (err) {
                console.log('1111')
                return res.status(401)
                    .send({
                        message: 'Auth fail',
                        success: false
                    })
            } else {
                console.log('2222')
                req.body.adminId = decoded.id
                next()
            }
        })
    } catch (error) {
        console.log('333')
        return res.status(401).send({
            message: 'Auth failed',
            success: false
        })
    }
}