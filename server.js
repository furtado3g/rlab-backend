const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3333;

app.use(express.json());

app.get('/',(req,res)=>{
    return res.sendFile(__dirname+'/src/public/templates/chat.html');
})

io.on('connect',(socket)=>{
    socket.on('message',(dados)=>{
        socket.broadcast.emit('message',dados)
        socket.emit('message',dados)
    })
})

http.listen(port,()=>{
    console.log("listen on "+port)
})