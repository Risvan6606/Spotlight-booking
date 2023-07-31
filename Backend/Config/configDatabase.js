
const mongoose = require('mongoose')
mongoose.connect(process.env.mongoUrl)
const connection = mongoose.connection
connection.on('connected', () => console.log('mongodb has been success full'))
connection.on('error', (error) => console.log('mongodb conncted has fail', error))
module.exports = mongoose

