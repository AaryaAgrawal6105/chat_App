const express = require('express');
const http = require('http');

const socketio= require('socket.io');
const { setInterval } = require('timers');
const app = express();
const server = http.createServer(app);
const io = socketio(server)
const {connect} = require('./config/database-config');
const { console } = require('inspector/promises');

const Chat= require('./models/chat')

io.on('connection', (socket) => {
    socket.on('join_room' ,(data)=>{

        socket.join(data.roomid);
    })
    // socket.join()
    console.log('a user connected', socket.id);

    socket.on('msg_send',async(data)=>{

        const chat = await Chat.create({
            roomId : data.roomid,
            user : data.username,
            content : data.msg
        });
        io.to(data.roomid).emit('msg_rcvd' , data)
    })

    socket.on('typing' , async(data)=>{
        socket.broadcast.to(data.roomid).emit('someone_typing')
    })

})
app.set('view engine','ejs')
app.use('/', express.static(__dirname + '/public'))
app.get('/chat/:roomid',async(req,res)=>{

    const chats = await Chat.find({
        roomId:req.params.roomid
    }

    ).select('content user')
    res.render('index' , {
        name : 'Aarya',
        id : req.params.roomid,
        chats : chats
    })
})
server.listen(3000, async () => {
    console.log("app is listening on the server 3000");
    try {
        await connect();
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
});
