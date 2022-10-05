const { Server } = require('socket.io');
const DB = require('./config/DB');

let io;
let urlGetProducts = 'api/productos';   // url que se brinda a clientes, para hacer un fetch de los productos.
let messages = [{                       // formato de mensajes, con mensaje inicial.
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
        
        // Se emite la lista de productos vigente, al momento de la conexión del cliente.
        socketClient.emit('init-products', urlGetProducts);
        
        // Se emite el registro histórico de mensajes, al momento de la conexión del cliente.
        socketClient.emit('log-messages', messages);

        // Nuevo producto agregado, se emite a todos los clientes.
        socketClient.on('new-product', (data) => {
            io.emit('update-products', data);
        });

        // Se almacena nuevo mensaje en arrreglo local y en un archivo de texto en la DB. Luego, se emite a todos los clientes conectados.
        socketClient.on('send-message', (data) => {
            messages.push(data);
            DB.addMessage(data);
            io.emit('new-message', data);
        });

        socketClient.on('disconnect', () => {
            console.log(`Usuario ${socketClient.id} desconectado.`);
        });
    });
}

// Función a exportar para que poder emitir a traves del socket, pero desde otros archivos.
function emit(event, data) {
    io.emit(event, data);
}

module.exports = {
    initSocket,
    emit
}