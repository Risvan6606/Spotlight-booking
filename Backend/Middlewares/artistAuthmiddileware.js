const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token, process.env.artist_Secrect_key, (err, decoded) => {
            if (err) {
                console.log('3')
                return res.status(401).send({
                    message: 'Auth faild',
                    success: false
                })
            } else {
                req.body.artistId = decoded.id
                console.log('1')
                next()
            }
        })
    } catch (error) {
        console.log('2')
        return res.status(401).send({
            message: 'Auth failed',
            success: false
        })
    }
}