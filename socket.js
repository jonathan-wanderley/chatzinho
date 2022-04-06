const User = require('./src/models/User');

module.exports = {
    server: async (io) => {
        let connectedUsers = [];
        let username;

        io.use( async (socket, next) => {

            const token = socket.handshake.auth.token;
            const user = await User.findOne({token})
            
            if(user) {
                username = user.nickname;
                next();
            } else {
                next(new Error("Você não está logado!"));
            }
            
        });

        io.on('connection', (socket) => {
            console.log(`${username} se conectou 👀`);

            //Requisição pra entrada no Chat
            socket.on('join-request', () => {
                socket.username = username;
                connectedUsers.push( username );
                console.log( connectedUsers );

                //Mandar um ok pro user que fez a requisição
                socket.emit('user-ok', {
                    connectedUsers,
                    nickname: username
                });
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


    }
}