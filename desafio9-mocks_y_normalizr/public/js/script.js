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

// Normalizer
const emailSchema = new normalizr.schema.Entity('emails');
const nameSchema = new normalizr.schema.Entity('names');
const lastNameSchema = new normalizr.schema.Entity('lastNames');
const ageSchema = new normalizr.schema.Entity('ages');
const aliasSchema = new normalizr.schema.Entity('alias');
const avatarSchema = new normalizr.schema.Entity('avatars');
const commentSchema = new normalizr.schema.Entity('comments');
const authorSchema = new normalizr.schema.Entity('authors', {
    email: emailSchema,
    name: nameSchema,
    lastName: lastNameSchema,
    age: ageSchema,
    alias: aliasSchema,
    avatar: avatarSchema
},
    { idAttribute: 'email' }
);
const postSchema = new normalizr.schema.Entity('posts', {
    messages: [{
        authors: authorSchema,
        comments: commentSchema
    }]
});

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
    showMessages(messages);
});

// Se recibe nuevo mensaje desde el Centro de Mensajes.
socket.on('new-message', (data) => {
    // messages.push(newMessage);

    console.log(data);
    let bytesIN = JSON.stringify(data).length;
    console.log("bytesIN", bytesIN);
    const denormalized = normalizr.denormalize(data.result, postSchema, data.entities);
    let bytesOUT = JSON.stringify(denormalized).length;
    console.log("bytesOUT", bytesOUT);
    console.log("Denormalized", JSON.stringify(denormalized, null, 2));
    console.log("Porcentaje de compresión: %", ((1 - bytesOUT / bytesIN) * 100).toFixed(2));

    showMessages(messages);
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
function showMessages(array) {
    messageList.innerHTML = '';
    array.forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `
            <b style="color:#6495ED"> ${m.author.email}</b>
            <span style="color:#CD7F32">[${m.timestamp.YY}/${m.timestamp.MM}/${m.timestamp.DD} ${m.timestamp.hh}:${m.timestamp.mm}:${m.timestamp.ss}]</span>:
            <i style="color:#00A36C">${m.content}</i>`;
        messageList.appendChild(li);
    })
}