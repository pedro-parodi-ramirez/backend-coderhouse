const socket = io();
const productTable = document.getElementById('product-table');
const addProduct = document.getElementById('form-add-product');
const inputTitle = document.getElementById('title');
const inputPrice = document.getElementById('price');
const inputThumbnail = document.getElementById('thumbnail');
const messageList = document.getElementById('list-messages');
const formMessage = document.getElementById('form-message');
const inputUserEmail = document.getElementById('user-email');
const inputUserMessage = document.getElementById('user-message');

let template;           // Template para las card-images de la lista de productos. Es captado mediante un fetch a archivo público de servidor.
let messages = [];      // Arreglo local de mensajes del Centro de Mensajes.
let products = [];      // Arreglo local de la lista de productos

// Solicitud GET para obtener el template de las card-image de los productos
fetch('http://localhost:3000/templates/card-images.hbs')
    .then(response => response.text())
    .then(text => template = Handlebars.compile(text));

// Conexión al servidor.
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

// Se capta lista de productos al momento de la conexión.
socket.on('init-products', (data) => {
    // Actualización del arreglo local de productos
    products = data;

    // Se presentan productos con Handlebars.
    const html = (products.map(products => template(products))).join('');
    productTable.innerHTML = html;
});

// Se recibe log histórico de mensajes al momento de la conexión.
socket.on('log-messages', logMessages => {
    messageList.innerHTML = '';
    messages = logMessages;
    showMessages(logMessages);
});

// Se recibe nuevo mensaje desde el Centro de Mensajes.
socket.on('new-message', newMessage => {
    messages.push(newMessage);
    showMessages(newMessage);
})

// Se recibe un nuevo producto agregado a través del formulario. Se agrega a arreglo local y se presenta.
socket.on('update-products', (data) => {
    products.push(data);
    productTable.innerHTML += template(data);
});

// Formulario agregar producto
// Se agrega nuevo producto al arreglo local y se genera evento para emitirlo a todos los clientes conectados.
addProduct.addEventListener('submit', () => {
    let data = {
        title: inputTitle.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value
    };
    products.push(data);
    socket.emit('new-product', data);
});

// Se emite nuevo mensaje a todos los clientes conectados.
formMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = new Date();
    const time = {
        YY: (date.getFullYear()).toString().padStart(2, '0'),
        MM: (date.getMonth()).toString().padStart(2, '0'),
        DD: (date.getDate()).toString().padStart(2, '0'),
        hh: (date.getHours()).toString().padStart(2, '0'),
        mm: (date.getMinutes()).toString().padStart(2, '0'),
        ss: (date.getSeconds()).toString().padStart(2, '0')
    }
    const data = {
        email: inputUserEmail.value,
        time: `${time.YY}:${time.MM}:${time.DD} ${time.hh}:${time.mm}:${time.ss}`,
        message: inputUserMessage.value
    };
    console.log(data.time);
    socket.emit('send-message', data)
    inputUserMessage.value = '';
    inputUserMessage.focus();
});

// Función para presentar nuevos mensajes en el Centro de Mensajes, según formato requerido.
function showMessages(messages) {
    messages.forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `
            <b style="color:#6495ED"> ${m.email}</b>
            <span style="color:#CD7F32">[${m.time}]</span>:
            <i style="color:#00A36C">${m.message}</i>`;
        messageList.appendChild(li);
    });
}