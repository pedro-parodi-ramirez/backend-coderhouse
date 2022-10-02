const { Server } = require('socket.io');

let  io;

function setEvent(io){
    io.on('connection', (socketClient) => {
        console.log(`Nuevo usuario ${socketClient.id} conectado.`);
    
        socketClient.on('disconnect', () => {
            console.log(`Usuario ${socketClient.id} desconectado.`);
        });
    });
}

function initSocket(httpServer){
    io = new Server(httpServer);
    setEvent(io);
}

module.exports = {
    initSocket: initSocket,
}