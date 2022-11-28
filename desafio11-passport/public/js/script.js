// Socket IO
const socket = io();

// Main website
const mainContainer = document.getElementById('main-container');
mainContainer.classList.add('d-none');

// Session
const userSignIn = {
    email: document.getElementById('email-sign-in'),
    password: document.getElementById('password-sign-in')
}
const userSignUp = {
    email: document.getElementById('email-sign-up'),
    password: document.getElementById('password-sign-up')
}
const loginTitle = document.getElementById('login-title');
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');
const goToSignIn = document.getElementById('go-to-sign-in');
const goToSignUp = document.getElementById('go-to-sign-up');
const signOutDiv = document.getElementById('sign-out-div');
const signInDiv = document.getElementById('sign-in-div');
const signUpDiv = document.getElementById('sign-up-div');
const usernameOutput = document.getElementById('username-output');
const btnSignOut = document.getElementById('btn-sign-out');

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

/* -------------------------------------------- SESSION -------------------------------------------- */
// Al iniciar el sitio web, si corrobora si hay sesión iniciada
window.addEventListener('load', async () => {
    const rawResponse = await fetch("http://localhost:3000/users/me");
    if (rawResponse.status === 200) {
        let response = await rawResponse.json();
        mainContainer.classList.remove('d-none');
        signOutDiv.classList.remove('d-none');
        signInDiv.classList.add('d-none');
        signUpDiv.classList.add('d-none');
        usernameOutput.innerText = `Bienvenido ${response.email} !`;
    }
    else {
        mainContainer.classList.add('d-none');
        signOutDiv.classList.add('d-none');
        signInDiv.classList.remove('d-none');
        usernameOutput.innerText = '';
    }
});

// Iniciar sesión
btnSignIn.addEventListener('click', async () => {
    const data = {
        email: userSignIn.email.value,
        password: userSignIn.password.value
    };
    const dataJSON = JSON.stringify(data);

    const rawResponse = await fetch("http://localhost:3000/auth/sign-in", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    if (rawResponse.status === 200) {
        let response = await rawResponse.json();
        userSignIn.email.value = '';
        userSignIn.password.value = '';
        mainContainer.classList.remove('d-none');
        signOutDiv.classList.remove('d-none');
        signInDiv.classList.add('d-none');
        signUpDiv.classList.add('d-none');
        usernameOutput.innerText = response.message;
    }
});
goToSignUp.addEventListener('click', () => {
    userSignIn.email.value = '';
    userSignIn.password.value = '';
    signInDiv.classList.add('d-none');
    signUpDiv.classList.remove('d-none');
});

// Registrarse
btnSignUp.addEventListener('click', async () => {
    const data = {
        email: userSignUp.email.value,
        password: userSignUp.password.value
    };
    console.log("data", data);
    const dataJSON = JSON.stringify(data);

    const rawResponse = await fetch("http://localhost:3000/auth/sign-up", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    if (rawResponse.status === 200) {
        let response = await rawResponse.json();
        userSignUp.email.value = '';
        userSignUp.password.value = '';
        mainContainer.classList.remove('d-none');
        signOutDiv.classList.remove('d-none');
        signInDiv.classList.add('d-none');
        signUpDiv.classList.add('d-none');
        usernameOutput.innerText = response.message;
    }
});
goToSignIn.addEventListener('click', () => {
    userSignUp.email.value = '';
    userSignUp.password.value = '';
    signInDiv.classList.remove('d-none');
    signUpDiv.classList.add('d-none');
});

btnSignOut.addEventListener('click', async () => {
    mainContainer.classList.add('d-none');
    const rawResponse = await fetch("http://localhost:3000/auth/sign-out", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    const response = await rawResponse.json();
    usernameOutput.innerText = response.message;
    btnSignOut.classList.add('d-none');
});

/* -------------------------------------------- SOCKET IO -------------------------------------------- */
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

/* -------------------------------------------- NEW PRODUCT -------------------------------------------- */
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

/* -------------------------------------------- UTILIDADES -------------------------------------------- */
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