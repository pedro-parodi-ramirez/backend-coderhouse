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
const inputNameAdd = document.getElementById('name-add');
const inputPriceAdd = document.getElementById('price-add');
const inputImageAdd = document.getElementById('image-add');
const inputDescriptionAdd = document.getElementById('description-add');
const inputCodeAdd = document.getElementById('code-add');
const inputStockAdd = document.getElementById('stock-add');
const buttonAddProduct = document.getElementById('button-add-product');
const buttonCancelFormAdd = document.getElementById('button-cancel-form-add');
const containerAddProduct = document.getElementById('container-add-product');
const formAddProduct = document.getElementById('form-add-product');

// Elementos modificar producto
const inputNameUpdate = document.getElementById('name-update');
const inputPriceUpdate = document.getElementById('price-update');
const inputImageUpdate = document.getElementById('image-update');
const inputDescriptionUpdate = document.getElementById('description-update');
const inputCodeUpdate = document.getElementById('code-update');
const inputStockUpdate = document.getElementById('stock-update');
const buttonCancelFormUpdate = document.getElementById('button-cancel-form-update');
const containerUpdateProduct = document.getElementById('container-update-product');
const formUpdateProduct = document.getElementById('form-update-product');

// Elementos carrito de compras
let shoppingChartID = null;
const chartList = document.getElementById('chart-list');
let chart = [];
const totalPrice = document.getElementById('total');

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
    buttonAddProduct.classList.remove('d-none');
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
        products.forEach(p => p.price = parseFloat(p.price).toFixed(2));

        // Se presentan productos con Handlebars.
        const html = (products.map(product => template(product))).join('');
        productTable.innerHTML = html;

        // Se configuran eventos de los botones en las card-image
        products.forEach(p => {
            // Eliminar producto de la DB
            document.getElementById(`button-delete-product-id${p._id}`).addEventListener('click', async () => {
                // Solicitud DELETE a servidor y actualización de página
                const rawResponse = await fetch(`http://localhost:8080/api/productos/${p._id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'DELETE'
                });
                if (rawResponse.status === STATUS.ACCEPTED) { window.location.href = "/" }
                else {
                    let message = await rawResponse.text();
                    window.alert(message);
                }
            });

            // Modificar producto de la DB
            document.getElementById(`button-update-product-id${p._id}`).addEventListener('click', () => {
                // Muestra formulario para modificar producto
                document.getElementById('idProduct').value = p._id;
                buttonAddProduct.classList.add('d-none');
                containerUpdateProduct.className = 'mt-5';
                productContainer.className = 'd-flex d-none';
            });

            // Agregar producto al carrito
            document.getElementById(`button-add-to-chart-id${p._id}`).addEventListener('click', async () => {
                // Si carrito no existe, se crea
                if (shoppingChartID === null) {
                    // Solicitud POST para crear carrito en servidor
                    document.getElementById('chart-container').className = '';
                    const rawResponse = await fetch('http://localhost:8080/api/carrito', {
                        method: 'POST'
                    });
                    shoppingChartID = await rawResponse.json();
                }

                // Solicitud POST para agregar producto a carrito
                const dataJSON = JSON.stringify({ id: p._id });
                const rawResponse = await fetch(`http://localhost:8080/api/carrito/${shoppingChartID}/productos`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': dataJSON.length
                    },
                    method: 'POST',
                    body: dataJSON
                });

                // La solicitud devuelve los productos del carrito
                chartProducts = await rawResponse.json();

                // Se lista los productos del carrito y se actualiza el valor total de la compra
                showChartProducts(chartProducts);
            });

        });
    }
})();

// POST para agregar nuevo producto en base de datos
formAddProduct.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: inputNameAdd.value,
        price: inputPriceAdd.value,
        image: inputImageAdd.value,
        description: inputDescriptionAdd.value,
        code: inputCodeAdd.value,
        stock: inputStockAdd.value,
    };
    const dataJSON = JSON.stringify(data);
    const rawResponse = await fetch("http://localhost:8080/api/productos", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    if (rawResponse.status === STATUS.ACCEPTED) { window.location.href = "/" }
    else {
        let message = await rawResponse.text();
        window.alert(message);
    }
});

// POST para modificar producto en base de datos
formUpdateProduct.addEventListener('submit', async (e) => {
    e.preventDefault();
    let idProduct = document.getElementById('idProduct').value;
    const data = {
        name: inputNameUpdate.value,
        price: inputPriceUpdate.value,
        image: inputImageUpdate.value,
        description: inputDescriptionUpdate.value,
        code: inputCodeUpdate.value,
        stock: inputStockUpdate.value,
    };
    const dataJSON = JSON.stringify(data);
    const rawResponse = await fetch(`http://localhost:8080/api/productos/${idProduct}`, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'PUT',
        body: dataJSON
    });
    if (rawResponse.status === STATUS.ACCEPTED) { window.location.href = "/" }
    else {
        let message = await rawResponse.text();
        window.alert(message);
    }
});

// Listar productos en carrito de comrpas
function showChartProducts(chartProducts) {
    let total = 0;
    chartList.innerHTML = '';
    totalPrice.value = 0;
    chartProducts.forEach(p => {
        total += (p.product.price * p.quantity);
        const li = document.createElement('li');
        li.innerHTML = `
            <h5>${p.product.name}</h5>
            <p>${p.product.description}<br>
            <b>$ ${p.product.price}</b><br>
            Cantidad: ${p.quantity}
            <button id="button-delete-from-chart-id${p.product._id}" type="button" class="btn btn-danger ms-2">Eliminar</button>
            </p>
        `;
        chartList.appendChild(li);

        // Se agrega funcionalidad para eliminar producto del carrito de compras
        document.getElementById(`button-delete-from-chart-id${p.product.id}`).addEventListener('click', async () => {
            // Solicitud DELETE a servidor para eliminar producto de carrito
            const rawResponse = await fetch(`http://localhost:8080/api/carrito/${shoppingChartID}/productos/${p.product._id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            });
            const updatedChart = await rawResponse.json();
            showChartProducts(updatedChart);
        });
    });
    totalPrice.value = total.toFixed(2);
}