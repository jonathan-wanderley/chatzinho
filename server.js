require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { mongoConnect } = require('./src/database/mongo')
const apiRoutes = require('./src/routes')

mongoConnect();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

server.listen(process.env.PORT, () => {
    console.log(`🔥 Servidor rodando`);
});

app.use('/', apiRoutes);

app.use(express.static(path.join(__dirname, '/public')));

let connectedUsers = [];

io.on('connection', (socket) => {
    console.log('🔥 Conexão detectada...');

    socket.on('join-request', (username) => {
        socket.username = username;
        connectedUsers.push( username );
        console.log( connectedUsers );

        

        socket.emit('user-ok', connectedUsers);
        socket.broadcast.emit('list-update', {
            joined: username,
            list: connectedUsers
        });
    })

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(u => u != socket.username);
        console.log(connectedUsers);

        socket.broadcast.emit('list-update', {
            left: socket.username,
            list: connectedUsers
        });

    })

    socket.on('send-msg', (txt) => {
        let obj = {
            username: socket.username,
            message: txt
        };

        // socket.emit('show-msg', obj);
        socket.broadcast.emit('show-msg', obj);
    });

});