// Socket IO
const socket = io();

// Main website
const mainContainer = document.getElementById('main-container');
mainContainer.classList.add('d-none');

// Session
let username = '';
const loginForm = document.getElementById('form-login');
const logOutDiv = document.getElementById('logout-div');
const logInDiv = document.getElementById('login-div');
const usernameOutput = document.getElementById('username-output');
const logoutBtn = document.getElementById('logout-btn');

// Productos
const productTable = document.getElementById('product-table');
const addProduct = document.getElementById('form-add-product');
const inputTitle = document.getElementById('title');
const inputPrice = document.getElementById('price');
const inputThumbnail = document.getElementById('thumbnail');

// Centro de mensajes
const messageList = document.getElementById('list-messages');
const formMessage = document.getElementById('form-message');
const inputUserEmail = document.getElementById('user-email');
const inputUserContent = document.getElementById('user-content');
const inputUserName = document.getElementById('user-name');
const inputUserLastName = document.getElementById('user-lastName');
const inputUserAlias = document.getElementById('user-alias');
const inputUserAvatar = document.getElementById('user-avatar');
const inputUserAge = document.getElementById('user-age');
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

/* Session */
// Al iniciar el sitio web, si corrobora si hay sesión iniciada
window.addEventListener('load', async () => {
    const rawResponse = await fetch("http://localhost:3000/login");
    if (rawResponse.status === 200) {
        let response = await rawResponse.json();
        username = response.username;
        console.log(username);
        mainContainer.classList.remove('d-none');
        logOutDiv.classList.remove('d-none');
        logInDiv.classList.add('d-none');
        usernameOutput.innerText = `Bienvenido ${username} !`;
    }
    else {
        mainContainer.classList.add('d-none');
        logOutDiv.classList.add('d-none');
        logInDiv.classList.remove('d-none');
        usernameOutput.innerText = '';
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { username: e.target.elements[0].value };
    const dataJSON = JSON.stringify(data);

    const rawResponse = await fetch("http://localhost:3000/login", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    if (rawResponse.status === 200) {
        let response = await rawResponse.json();
        username = response.username;
        document.getElementById('login').value = '';
        mainContainer.classList.remove('d-none');
        logOutDiv.classList.remove('d-none');
        logInDiv.classList.add('d-none');
        usernameOutput.innerText = `Bienvenido ${username} !`;
    }
});

logoutBtn.addEventListener('click', async () => {
    mainContainer.classList.add('d-none');
    await fetch("http://localhost:3000/logout", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    });
    usernameOutput.innerText = `Hasta luego ${username}!`;
    logoutBtn.classList.add('d-none');
});

// Conexión al servidor.
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

// Se capta lista de productos y mensajes al momento de la conexión.
socket.on('init-elements', async (data) => {
    // Solicitud GET para obtener el template de las card-image de los productos
    await fetch('http://localhost:3000/templates/card-images.hbs')
        .then(response => response.text())
        .then(text => template = Handlebars.compile(text));

    // Actualización del arreglo local de productos
    products = data.products;

    // Se presentan productos con Handlebars.
    const html = (products.map(products => template(products))).join('');
    productTable.innerHTML = html;

    // Se presentan log histórico de mensajes en patalla
    showMessages(data.messagesNormalized);
});

// Se recibe nuevo mensaje desde el Centro de Mensajes.
socket.on('new-message', (data) => {
    showMessages(data);
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
            name: inputUserName.value,
            lastName: inputUserLastName.value,
            age: inputUserAge.value,
            alias: inputUserAlias.value,
            avatar: inputUserAvatar.value,
        },
        content: inputUserContent.value,
        timestamp: time
    };
    socket.emit('send-message', data);
    inputUserContent.value = '';
    inputUserContent.focus();
});

// Función para presentar nuevos mensajes en el Centro de Mensajes, según formato requerido.
function showMessages(normalized) {
    console.log(normalized);
    let bytesNormalized = JSON.stringify(normalized).length;
    const denormalized = normalizr.denormalize(normalized.result, postSchema, normalized.entities);
    let bytesDenormalized = JSON.stringify(denormalized).length;
    console.log(denormalized);
    outputCompression.value = ((1 - bytesNormalized / bytesDenormalized) * 100).toFixed(2);

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