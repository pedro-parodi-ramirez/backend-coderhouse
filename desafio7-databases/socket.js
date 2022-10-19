const { Server } = require('socket.io');
const DB = require('./db/DB');

let io;
let messages = [];      // Arreglo local de mensajes del Centro de Mensajes.
let products = [];      // Arreglo local de la lista de productos

(async () => {
    products = await DB.getProducts();
    messages = await DB.readMessages();
})();

function initSocket(httpServer) {
    io = new Server(httpServer);
    setEvent(io);
}

function setEvent(io) {
    io.on('connection', (socketClient) => {
        console.log(`Nuevo usuario ${socketClient.id} conectado.`);

        // Se emite la lista de productos vigente, al momento de la conexión del cliente.
        (async () => {
            products = await DB.getProducts();
        })();
        socketClient.emit('init-products', products);

        // Se emite el registro histórico de mensajes, al momento de la conexión del cliente.
        socketClient.emit('log-messages', messages);

        // Nuevo producto agregado, se emite a todos los clientes.
        socketClient.on('new-product', (data) => {
            products.push(data);
            console.log("products", products);
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