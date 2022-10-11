const STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

const productTable = document.getElementById('product-table');
const addProduct = document.getElementById('form-add-product');
const inputNombre = document.getElementById('nombre');
const inputPrecio = document.getElementById('precio');
const inputFoto = document.getElementById('foto');
const inputDescripcion = document.getElementById('descripcion');
const inputCodigo = document.getElementById('codigo');
const inputStock = document.getElementById('stock');

let template;           // Template para las card-images de la lista de productos. Es captado mediante un fetch a archivo público de servidor.

// GET template para car-images
fetch("http://localhost:8080/templates/card-images.hbs")
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

// POST para agregar nuevo producto
addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        nombre: inputNombre.value,
        precio: inputPrecio.value,
        foto: inputFoto.value,
        descripcion: inputDescripcion.value,
        codigo: inputCodigo.value,
        stock: inputStock.value,
    };
    const dataJSON = JSON.stringify(data);
    fetch("http://localhost:8080/api/productos", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    })
        .then(response => {
            (response.status === STATUS.ACCEPTED) && (window.location.href = "/");
        });
});
