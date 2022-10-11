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
const buttonAddProduct = document.getElementById('button-add-product');
const buttonCancelForm = document.getElementById('button-cancel-form');
const containerAddProduct = document.getElementById('container-add-product');

let template;   // Template para las card-images de la lista de productos. Es captado mediante un fetch a archivo público de servidor.

buttonAddProduct.addEventListener('click', () => {
    buttonAddProduct.classList.add('d-none');
    containerAddProduct.className = 'mt-5';
});

buttonCancelForm.addEventListener('click', () => {
    buttonAddProduct.classList.remove('d-none');
    containerAddProduct.className = 'd-flex d-none';
});

// GET template para card-images
(async () => {
    const rawResponse = await fetch("http://localhost:8080/templates/card-images.hbs");
    text = await rawResponse.text();
    template = Handlebars.compile(text);
})();

// GET para obtener todos los productos y listarlos
(async () => {
    const rawResponse = await fetch("http://localhost:8080/api/productos");
    const products = await rawResponse.json();
    if (products.length > 0) {
        // Se acomodan los precios con dos decimales
        products.forEach(p => p.precio = parseFloat(p.precio).toFixed(2));

        // Se presentan productos con Handlebars.
        const html = (products.map(products => template(products))).join('');
        productTable.innerHTML = html;
    }
})();

// POST para agregar nuevo producto
addEventListener('submit', async (e) => {
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
    const response = await fetch("http://localhost:8080/api/productos", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    (response.status === STATUS.ACCEPTED) && (window.location.href = "/");
});
