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
const productContainer = document.getElementById('product-container');
const addProduct = document.getElementById('form-add-product');

const inputNombreAdd = document.getElementById('nombre-add');
const inputPrecioAdd = document.getElementById('precio-add');
const inputFotoAdd = document.getElementById('foto-add');
const inputDescripcionAdd = document.getElementById('descripcion-add');
const inputCodigoAdd = document.getElementById('codigo-add');
const inputStockAdd = document.getElementById('stock-add');
const inputNombreUpdate = document.getElementById('nombre-update');
const inputPrecioUpdate = document.getElementById('precio-update');
const inputFotoUpdate = document.getElementById('foto-update');
const inputDescripcionUpdate = document.getElementById('descripcion-update');
const inputCodigoUpdate = document.getElementById('codigo-update');
const inputStockUpdate = document.getElementById('stock-update');

const buttonAddProduct = document.getElementById('button-add-product');
const buttonCancelFormAdd = document.getElementById('button-cancel-form-add');
const buttonCancelFormUpdate = document.getElementById('button-cancel-form-update');
const containerAddProduct = document.getElementById('container-add-product');
const containerUpdateProduct = document.getElementById('container-update-product');
const buttonDeleteProduct = document.getElementById('button-delete-product');
const formAddProduct = document.getElementById('form-add-product');
const formUpdateProduct = document.getElementById('form-update-product');

let template;   // Template para las card-images de la lista de productos. Es captado mediante un fetch a archivo público de servidor.

buttonAddProduct.addEventListener('click', () => {
    buttonAddProduct.classList.add('d-none');
    containerAddProduct.className = 'mt-5';
});

buttonCancelFormAdd.addEventListener('click', () => {
    buttonAddProduct.classList.remove('d-none');
    document.getElementById('form-add-product').reset();
    containerAddProduct.className = 'd-flex d-none';
});

buttonCancelFormUpdate.addEventListener('click', () => {
    containerUpdateProduct.classList.add('d-none');
    document.getElementById('form-update-product').reset();
    productContainer.className = '';
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
        const html = (products.map(product => template(product))).join('');
        productTable.innerHTML = html;

        // Se configuran eventos de los botones
        products.forEach(p => {
            // Eliminar producto de la DB
            document.getElementById(`button-delete-product-id${p.id}`).addEventListener('click', async () => {
                const response = await fetch(`http://localhost:8080/api/productos/${p.id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'DELETE'
                });
                (response.status === STATUS.ACCEPTED) && (window.location.href = "/");
            });

            // Modificar producto de la DB
            document.getElementById(`button-update-product-id${p.id}`).addEventListener('click', () => {
                document.getElementById('idProduct').value = p.id;
                buttonAddProduct.classList.add('d-none');
                containerUpdateProduct.className = 'mt-5';
                productContainer.className = 'd-flex d-none';
            });
        });
    }
})();

// POST para agregar nuevo producto
formAddProduct.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nombre: inputNombreAdd.value,
        precio: inputPrecioAdd.value,
        foto: inputFotoAdd.value,
        descripcion: inputDescripcionAdd.value,
        codigo: inputCodigoAdd.value,
        stock: inputStockAdd.value,
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

// POST para modificar producto
formUpdateProduct.addEventListener('submit', async (e) => {
    e.preventDefault();
    let idProduct = document.getElementById('idProduct').value;
    const data = {
        nombre: inputNombreUpdate.value,
        precio: inputPrecioUpdate.value,
        foto: inputFotoUpdate.value,
        descripcion: inputDescripcionUpdate.value,
        codigo: inputCodigoUpdate.value,
        stock: inputStockUpdate.value,
    };
    const dataJSON = JSON.stringify(data);
    const response = await fetch(`http://localhost:8080/api/productos/${idProduct}`, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'PUT',
        body: dataJSON
    });
    (response.status === STATUS.ACCEPTED) && (window.location.href = "/");
});