const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express()
// edited
const http = require('http');
// edited

require('dotenv').config()
const configDatabase = require('./Config/configDatabase')
const socketIo = require('socket.io')
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

// edited
const Server = http.createServer(app);
const io = socketIo(Server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    console.log('A user connected')
    socket.on('chat message', (message) => {
        console.log('Recived message:', message);

        io.emit('chat message', message);
    })
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})
// Edited :server change to app

const PORT = process.env.PORT || 5000
Server.listen(PORT, () => console.log(`Server running on ${PORT}`))




