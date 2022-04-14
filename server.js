require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { mongoConnect } = require('./src/database/mongo')
const apiRoutes = require('./src/routes')
const socket = require('./socket');

mongoConnect();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

server.listen(process.env.PORT, () => {
    console.log(`🔥 Servidor rodando!`);
});

app.use('/', apiRoutes);
app.use((req, res)=>{
    res.status(404).render('404');
});

socket.server(io);