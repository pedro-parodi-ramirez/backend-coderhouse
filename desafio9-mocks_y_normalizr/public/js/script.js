const socket = io();
const productTable = document.getElementById('product-table');
const addProduct = document.getElementById('form-add-product');
const inputTitle = document.getElementById('title');
const inputPrice = document.getElementById('price');
const inputThumbnail = document.getElementById('thumbnail');
const messageList = document.getElementById('list-messages');
const formMessage = document.getElementById('form-message');
const inputUserEmail = document.getElementById('user-email');
const inputUserContent = document.getElementById('user-content');
const outputCompression = document.getElementById('compression');

// Normalizer
const commentSchema = new normalizr.schema.Entity('comments');
const authorSchema = new normalizr.schema.Entity('authors', {}, { idAttribute: 'email' }
);
const postSchema = new normalizr.schema.Entity('posts', {
    messages: [{
        authors: authorSchema,
        comments: commentSchema
    }]
});

let template;           // Template para las card-images de la lista de productos. Es captado mediante un fetch a archivo público de servidor.
let products = [];      // Arreglo local de la lista de productos
let messages = [];

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
socket.on('log-messages', (logMessages) => {
    console.log("LOG-MESSAGES");
    messages = logMessages;
    messageList.innerHTML = '';
    showMessages(logMessages);
});

// Se recibe nuevo mensaje desde el Centro de Mensajes.
socket.on('new-message', (data) => {
    let bytesNormalized = JSON.stringify(data).length;
    const denormalized = normalizr.denormalize(data.result, postSchema, data.entities);
    let bytesDenormalized = JSON.stringify(denormalized).length;
    console.log(data);
    console.log(denormalized);
    outputCompression.value = ((1 - bytesNormalized / bytesDenormalized) * 100).toFixed(2);
    showMessages(denormalized);
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
    };

    const data = {
        author: {
            email: inputUserEmail.value,
            name: 'name',
            lastName: 'lastName',
            age: 'age',
            alias: 'alias',
            avatar: 'avatar',
        },
        content: inputUserContent.value,
        timestamp: time
    };
    socket.emit('send-message', data);
    inputUserContent.value = '';
    inputUserContent.focus();
});

// Función para presentar nuevos mensajes en el Centro de Mensajes, según formato requerido.
function showMessages(denormalized) {
    console.log(denormalized);
    messageList.innerHTML = '';
    (denormalized.messages).forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `
            <b style="color:#6495ED"> ${m.authors.email}</b>
            <span style="color:#CD7F32">[${m.comments.timestamp.YY}/${m.comments.timestamp.MM}/${m.comments.timestamp.DD} ${m.comments.timestamp.hh}:${m.comments.timestamp.mm}:${m.comments.timestamp.ss}]</span>:
            <i style="color:#00A36C">${m.comments.content}</i>`;
        messageList.appendChild(li);
    })
}