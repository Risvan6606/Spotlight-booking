const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express()
require('dotenv').config()
const configDatabase = require('./Config/configDatabase')
app.use(express.json())
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const userRoute = require('./Routes/userRoute')
const artistRoute = require('./Routes/artistRoute')
const adminRoute = require('./Routes/adminRoute')

app.use('/api/user/', userRoute)
app.use('/api/artist/', artistRoute)
app.use('/api/admin/', adminRoute)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))




