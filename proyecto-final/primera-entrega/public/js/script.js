const STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

// Lista de productos
const productTable = document.getElementById('product-table');
const productContainer = document.getElementById('product-container');

// Elementos agregar producto
const inputNombreAdd = document.getElementById('nombre-add');
const inputPrecioAdd = document.getElementById('precio-add');
const inputFotoAdd = document.getElementById('foto-add');
const inputDescripcionAdd = document.getElementById('descripcion-add');
const inputCodigoAdd = document.getElementById('codigo-add');
const inputStockAdd = document.getElementById('stock-add');
const buttonAddProduct = document.getElementById('button-add-product');
const buttonCancelFormAdd = document.getElementById('button-cancel-form-add');
const containerAddProduct = document.getElementById('container-add-product');
const formAddProduct = document.getElementById('form-add-product');

// Elementos modificar producto
const inputNombreUpdate = document.getElementById('nombre-update');
const inputPrecioUpdate = document.getElementById('precio-update');
const inputFotoUpdate = document.getElementById('foto-update');
const inputDescripcionUpdate = document.getElementById('descripcion-update');
const inputCodigoUpdate = document.getElementById('codigo-update');
const inputStockUpdate = document.getElementById('stock-update');
const buttonCancelFormUpdate = document.getElementById('button-cancel-form-update');
const containerUpdateProduct = document.getElementById('container-update-product');
const formUpdateProduct = document.getElementById('form-update-product');

// Elementos carrito de compras
let shoppingChartID = null;
const chartList = document.getElementById('chart-list');

let template;   // Template para las card-images de la lista de productos. Es captado mediante un fetch a archivo público de servidor.

// Eventos agregar productos
buttonAddProduct.addEventListener('click', () => {
    buttonAddProduct.classList.add('d-none');
    containerAddProduct.className = 'mt-5';
});

buttonCancelFormAdd.addEventListener('click', () => {
    buttonAddProduct.classList.remove('d-none');
    document.getElementById('form-add-product').reset();
    containerAddProduct.className = 'd-flex d-none';
});

// Eventos modificar producto
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

            // Agregar producto al carrito
            document.getElementById(`button-add-to-chart-id${p.id}`).addEventListener('click', async () => {
                // Si carrito no existe, se crea
                if (shoppingChartID === null) {
                    document.getElementById('chart-container').className = '';
                    const rawResponse = await fetch('http://localhost:8080/api/carrito', {
                        method: 'POST'
                    });
                    shoppingChartID = await rawResponse.json();
                }
                const dataJSON = JSON.stringify({id: p.id});
                await fetch(`http://localhost:8080/api/carrito/${shoppingChartID}/productos`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': dataJSON.length
                    },
                    method: 'POST',
                    body: dataJSON
                });
                const li = document.createElement('li');
                li.innerHTML = `
                    <h5>${p.nombre}</h5>
                    <p>${p.descripcion}<br>
                    <b>$ ${p.precio}</b></p>
                `;
                chartList.appendChild(li);
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