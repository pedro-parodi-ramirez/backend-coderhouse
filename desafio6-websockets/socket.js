const { Server } = require('socket.io');

let io;
let urlGetProducts = 'api/productos';
let messages = [{
    email: 'welcome@store',
    time: {
        YY: 00,
        MM: 00,
        DD: 00,
        hh: 00,
        mm: 00,
        ss: 00
    },
    message: 'Bienvenido!'
}];

function initSocket(httpServer) {
    io = new Server(httpServer);
    setEvent(io);
}

function setEvent(io) {
    io.on('connection', (socketClient) => {
        console.log(`Nuevo usuario ${socketClient.id} conectado.`);
        socketClient.emit('init-products', urlGetProducts);
        socketClient.emit('log-messages', messages);

        socketClient.on('new-product', (data) => {
            io.emit('update-products', data);
        });

        socketClient.on('send-message', (data) => {
            messages.push(data);
            io.emit('new-message', data);
        });

        socketClient.on('disconnect', () => {
            console.log(`Usuario ${socketClient.id} desconectado.`);
        });
    });
}

function emit(event, data) {
    io.emit(event, data);
}

module.exports = {
    initSocket,
    emit
}