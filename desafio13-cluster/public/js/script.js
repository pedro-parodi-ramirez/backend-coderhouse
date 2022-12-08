// Socket IO
const socket = io();

// Main website
const mainContainer = document.getElementById('main-container');
mainContainer.classList.add('d-none');

// Process && Yargv
const btnServerInfo = document.getElementById('btn-server-info');
const btnGenerateNumbers = document.getElementById('btn-generate-numbers');
const divServerInfo = document.getElementById('div-server-info');
const listServerInfo = document.getElementById('list-server-info');

// Session
const user = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password')
};
const formAuth = document.getElementById('form-auth');
const authTitle = document.getElementById('auth-title');
const authErrorTitle = document.getElementById('auth-error-title');
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');
const btnToggleAuth = document.getElementById('btn-toggle-auth');
const btnSignOut = document.getElementById('btn-sign-out');
const btnGoToSignIn = document.getElementById('btn-go-to-sign-in');
const signOutDiv = document.getElementById('sign-out-div');
const authDiv = document.getElementById('auth-div');
const authErrorDiv = document.getElementById('auth-error-div');
const usernameOutput = document.getElementById('username-output');

// Productos
const btnShowAddProduct = document.getElementById('btn-show-add-product');
const btnCancelAddProduct = document.getElementById('btn-cancel-add-product');
const divAddProduct = document.getElementById('div-add-product');
const productTable = document.getElementById('product-table');
const addProduct = document.getElementById('form-add-product');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const inputImage = document.getElementById('image');

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
    const rawResponse = await fetch("http://localhost:8080/users/me");
    if (rawResponse.status === 200) {
        let response = await rawResponse.json();
        mainContainer.classList.remove('d-none');
        signOutDiv.classList.remove('d-none');
        authDiv.classList.add('d-none');
        usernameOutput.innerText = `Bienvenido ${response.email} !`;
    }
    else {
        mainContainer.classList.add('d-none');
        signOutDiv.classList.add('d-none');
        authDiv.classList.remove('d-none');
        usernameOutput.innerText = '';
    }
});

formAuth.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        name: user.name.value,
        email: user.email.value,
        password: user.password.value
    };
    const dataJSON = JSON.stringify(data);

    let rawResponse;
    // Sign-in
    if (event.submitter.id === 'btn-sign-in') {
        rawResponse = await fetch("http://localhost:8080/auth/sign-in", {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: dataJSON
        });
    }
    // Sign-up
    else if (event.submitter.id === 'btn-sign-up') {
        rawResponse = await fetch("http://localhost:8080/auth/sign-up", {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: dataJSON
        });
    }

    // Response
    if (rawResponse.status === 200) {
        let response = await rawResponse.json();
        mainContainer.classList.remove('d-none');
        signOutDiv.classList.remove('d-none');
        authDiv.classList.add('d-none');
        usernameOutput.innerText = response.message;
    }
    else {
        authDiv.classList.add('d-none');
        authErrorDiv.classList.remove('d-none');
        authErrorTitle.innerText = await rawResponse.text();
        // authErrorTitle.innerText = 'Error: invalid name or password.';
        // authErrorTitle.innerText = 'Error: user already exist';
    }
    user.name.value = '';
    user.email.value = '';
    user.password.value = '';
});

// Toggle sign-in sign-up
btnToggleAuth.addEventListener('click', () => {
    let text = btnToggleAuth.innerText;
    switch (text) {
        case 'Registrarse':
            btnSignIn.classList.add('d-none');
            btnSignUp.classList.remove('d-none');
            authTitle.innerText = 'Registro de usuario';
            btnToggleAuth.innerText = 'Iniciar sesión';
            break;
        default:
            btnSignIn.classList.remove('d-none');
            btnSignUp.classList.add('d-none');
            authTitle.innerText = 'Inicie sesión para continuar.';
            btnToggleAuth.innerText = 'Registrarse';
            break;
    }
    user.name.value = '';
    user.email.value = '';
    user.password.value = '';
});

// Back to sign-up from error
btnGoToSignIn.addEventListener('click', () => {
    btnSignIn.classList.remove('d-none');
    btnSignUp.classList.add('d-none');
    authTitle.innerText = 'Inicie sesión para continuar.';
    btnToggleAuth.innerText = 'Registrarse';
    authDiv.classList.remove('d-none');
    authErrorDiv.classList.add('d-none');
});

btnSignOut.addEventListener('click', async () => {
    mainContainer.classList.add('d-none');
    const rawResponse = await fetch("http://localhost:8080/auth/sign-out", {
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
    await fetch('http://localhost:8080/templates/card-images.hbs')
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
btnShowAddProduct.addEventListener('click', () => {
    divAddProduct.classList.remove('d-none');
})

btnCancelAddProduct.addEventListener('click', () => {
    divAddProduct.classList.add('d-none');
    addProduct.reset();
})

// Formulario agregar producto
// Se agrega nuevo producto al arreglo local y se genera evento para emitirlo a todos los clientes conectados.
addProduct.addEventListener('submit', () => {
    let data = {
        name: inputName.value,
        price: inputPrice.value,
        image: inputImage.value
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

/* -------------------------------------------- PROCESS && YARGV -------------------------------------------- */
// Mostrar información del servidor
btnServerInfo.addEventListener('click', async () => {
    if (!divServerInfo.classList.contains('d-none')) { divServerInfo.classList.add('d-none'); }
    else {
        divServerInfo.classList.remove('d-none');
        const rawResponse = await fetch('http://localhost:8080/info');
        const response = await rawResponse.json();

        let li;
        listServerInfo.innerHTML = `<li>argv:
                                        <ul id="inner-ul"></ul>
                                    </li>`;
        const innerUL = document.getElementById('inner-ul');
        innerUL.innerHTML = '';
        for (m in response) {
            li = document.createElement('li');
            if (m === 'argv') {
                let inerrLI;
                for (e in response[m]) {
                    inerrLI = document.createElement('li');
                    inerrLI.innerHTML = `${e}: ${response[m][e]}`;
                    innerUL.appendChild(inerrLI);
                }
            }
            else {
                li.innerHTML = `${m}: ${response[m]}`;
                listServerInfo.appendChild(li);
            }
        }
    }
})

btnGenerateNumbers.addEventListener('click', () => {
    const qty = document.getElementById('qty').value;
    window.location = `http://localhost:8080/api/randoms?qty=${qty}`;
});