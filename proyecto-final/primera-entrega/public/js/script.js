const productTable = document.getElementById('product-table');
const addProduct = document.getElementById('form-add-product');
const inputName = document.getElementById('title');
const inputPrice = document.getElementById('price');
const inputURL = document.getElementById('thumbnail');
const messageList = document.getElementById('list-messages');
const formMessage = document.getElementById('form-message');
const inputUserEmail = document.getElementById('user-email');
const inputUserMessage = document.getElementById('user-message');

let template;           // Template para las card-images de la lista de productos. Es captado mediante un fetch a archivo público de servidor.
let messages = []       // Arreglo local de mensajes del Centro de Mensajes.

// GET template para car-images
fetch(`http://localhost:8080/templates/card-images.hbs`)
    .then(response => response.text())
    .then(text => template = Handlebars.compile(text));

// GET para obtener todos los productos y listarlos
fetch("http://localhost:8080/api/productos")
    .then(respose => respose.json())
    .then(response => {
        const products = response;
        if (products.length > 0) {
            // Se presentan productos con Handlebars.
            const html = (products.map(products => template(products))).join('');
            productTable.innerHTML = html;
        }
    });