const User = require('./src/models/User');

module.exports = {
    server: async (io) => {
        let connectedUsersPrivate = [];
        let usernamePrivate;
        
        let connectedUsersPublic = [];
        let usernamePublic;
        
        let roomType;

        //Validar token
        io.use( async (socket, next) => {
            roomType = socket.handshake.auth.token.roomType;
            const token = socket.handshake.auth.token.value;
            const name = socket.handshake.auth.token.nickname;
            const user = await User.findOne({token})
            
            if(user && roomType == 'private') {
                usernamePrivate = user.nickname;
                next();
            }
            else if (!user && roomType == 'private') {
                next(new Error("Você não está logado!"));
            }
            else if (user && roomType == 'public' && user.nickname == name) {
                usernamePublic = name;
                next();
            }
            else if (roomType == 'public') {
                const userPublic = await User.findOne({nickname: name});
                if(userPublic) {
                    next(new Error(`Esse nick está reservado! Se for você, realize o login.`));
                }
                else if (connectedUsersPublic.includes(name)) {
                    next(new Error("Esse nick está em uso."));
                }
                else {
                    usernamePublic = name;
                    next();
                }
            } else {
                next(new Error("Algo deu errado, tente novamente!"));
            }
            
        });

        io.on('connection', (socket) => {
            if(roomType == 'private') {

                socket.join("private");

                console.log(`${usernamePrivate} conectou no chat privado 👑`);

                //Requisição pra entrada no Chat
                socket.on('join-request',  () => {
                    socket.username = usernamePrivate;
                    connectedUsersPrivate.push( usernamePrivate );
                    console.log( connectedUsersPrivate );

                        //Mandar um ok pro user que fez a requisição
                        socket.emit('user-ok', {
                            connectedUsersPrivate,
                            nickname: socket.username
                        });
                        socket.to("private").emit('list-update', {
                            joined: socket.username,
                            list: connectedUsersPrivate
                        });
                })

                socket.on('disconnect', () => {
                    connectedUsersPrivate = connectedUsersPrivate.filter(u => u != socket.username);
                    console.log(connectedUsersPrivate);

                    socket.to("private").emit('list-update', {
                        left: socket.username,
                        list: connectedUsersPrivate
                    });
                    
                    socket.leave("private");
                })

                socket.on('send-msg', (txt) => {
                    let obj = {
                        username: socket.username,
                        message: txt
                    };
                    io.to("private").emit('show-msg', obj);
                });



            }
            //Chat publico
            if(roomType == 'public') {


                socket.join("public");
                console.log(`${usernamePublic} conectou no chat publico 🌎`);

                //Requisição pra entrada no Chat
                socket.on('join-request',  () => {
                    socket.username = usernamePublic;
                    connectedUsersPublic.push( usernamePublic );
                    console.log( connectedUsersPublic );

                        //Mandar um ok pro user que fez a requisição
                        socket.emit('user-ok', {
                            connectedUsersPublic,
                            nickname: socket.username
                        });
                        socket.to("public").emit('list-update', {
                            joined: socket.username,
                            list: connectedUsersPublic
                        });
                })

                socket.on('disconnect', () => {
                    connectedUsersPublic = connectedUsersPublic.filter(u => u != socket.username);
                    console.log(connectedUsersPublic);

                    socket.to("public").emit('list-update', {
                        left: socket.username,
                        list: connectedUsersPublic
                    });
                    
                    socket.leave("public");
                })

                socket.on('send-msg', (txt) => {
                    let obj = {
                        username: socket.username,
                        message: txt
                    };
                    io.to("public").emit('show-msg', obj);
                });



            }
            
        });


    }
}