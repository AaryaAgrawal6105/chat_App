const express = require('express');
const http = require('http');

const socketio= require('socket.io');
const { setInterval } = require('timers');
const app = express();
const server = http.createServer(app);
const io = socketio(server)


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('from_client',()=>{
        console.log("event received from client")
    })

    setInterval(() => {
        socket.emit("from_server")
    }, 2000);
})

app.use('/', express.static(__dirname + '/public'))

server.listen(3000 , ()=>{
    console.log("app is listening on the server 3000")
})