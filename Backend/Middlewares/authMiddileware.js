const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("rr");
                return res
                    .status(401).send({
                        message: 'Auth failed',
                        success: false
                    })
            } else {
                // console.log('next')
                req.body.userId = decoded.id;
                next()
            }
        })
    } catch (error) {
        return res.status(401).send({
            message: 'Auth failed',
            success: false
        })
    }
}
