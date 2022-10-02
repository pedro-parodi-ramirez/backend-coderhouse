const { Server } = require('socket.io');

let  io;
let urlGetProducts = '/api/productos';

function initSocket(httpServer){
    io = new Server(httpServer);
    setEvent(io);
}

function setEvent(io){
    io.on('connection', (socketClient) => {
        console.log(`Nuevo usuario ${socketClient.id} conectado.`);
        socketClient.emit('history-products', urlGetProducts);

        socketClient.on('disconnect', () => {
            console.log(`Usuario ${socketClient.id} desconectado.`);
        });
    });
}

// function emit(event, data){
//     io.emit(event, data);
// }

module.exports = {
    initSocket
}