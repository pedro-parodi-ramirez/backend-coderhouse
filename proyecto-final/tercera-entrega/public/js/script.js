const STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

// Show products
const productTable = document.getElementById('product-table');
const productContainer = document.getElementById('product-container');

// Add product
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

// Update product
const inputNameUpdate = document.getElementById('name-update');
const inputPriceUpdate = document.getElementById('price-update');
const inputImageUpdate = document.getElementById('image-update');
const inputDescriptionUpdate = document.getElementById('description-update');
const inputCodeUpdate = document.getElementById('code-update');
const inputStockUpdate = document.getElementById('stock-update');
const buttonCancelFormUpdate = document.getElementById('button-cancel-form-update');
const containerUpdateProduct = document.getElementById('container-update-product');
const formUpdateProduct = document.getElementById('form-update-product');

// Shopping cart
let shoppingCartID = null;
const cartList = document.getElementById('cart-list');
let cart = [];
const totalPrice = document.getElementById('total');

let template;   // Template for card-images used for showing products. It's fetched from the server.

// Events --> Add product
buttonAddProduct.addEventListener('click', () => {
    buttonAddProduct.classList.add('d-none');
    containerAddProduct.className = 'mt-5';
});

buttonCancelFormAdd.addEventListener('click', () => {
    buttonAddProduct.classList.remove('d-none');
    document.getElementById('form-add-product').reset();
    containerAddProduct.className = 'd-flex d-none';
});

// Events --> Delete product
buttonCancelFormUpdate.addEventListener('click', () => {
    containerUpdateProduct.classList.add('d-none');
    buttonAddProduct.classList.remove('d-none');
    document.getElementById('form-update-product').reset();
    productContainer.className = '';
});

// Get all products and show them
(async () => {
    const rawResponseHandlebards = await fetch("http://localhost:8080/templates/card-images.hbs");
    text = await rawResponseHandlebards.text();
    template = Handlebars.compile(text);

    const rawResponse = await fetch("http://localhost:8080/api/productos");
    const products = await rawResponse.json();
    if (products.length > 0) {
        // Prices with two decimals
        await products.forEach(p => p.price = parseFloat(p.price).toFixed(2));

        // Use Handelbars for products
        const html = await (products.map(product => template(product))).join('');
        productTable.innerHTML = html;

        // Events for products
        products.forEach(p => {
            // Delete product
            document.getElementById(`button-delete-product-id${p._id}`).addEventListener('click', async () => {
                // Delete request to server and refresh website
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

            // Update product
            document.getElementById(`button-update-product-id${p._id}`).addEventListener('click', () => {
                // Show form
                document.getElementById('idProduct').value = p._id;
                buttonAddProduct.classList.add('d-none');
                containerUpdateProduct.className = 'mt-5';
                productContainer.className = 'd-flex d-none';
            });

            // Add product to cart
            document.getElementById(`button-add-to-cart-id${p._id}`).addEventListener('click', async () => {
                // If cart doesn't exist, create it
                if (shoppingCartID === null) {
                    document.getElementById('cart-container').className = '';
                    const rawResponse = await fetch('http://localhost:8080/api/carrito', {
                        method: 'POST'
                    });
                    shoppingCartID = await rawResponse.json();
                }

                // POST request to add product to cart
                const dataJSON = JSON.stringify(p);
                const rawResponse = await fetch(`http://localhost:8080/api/carrito/${shoppingCartID}/productos`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': dataJSON.length
                    },
                    method: 'POST',
                    body: dataJSON
                });

                // Request return all products from cart
                cartProducts = await rawResponse.json();

                // Show all product from cart and update total value of purchase
                showCartProducts(cartProducts);
            });

        });
    }
})();

// POST request to add new product to DB
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

// POST request to update product from DB
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

// Show all product from shopping cart
function showCartProducts(cartProducts) {
    let total = 0;
    cartList.innerHTML = '';
    totalPrice.value = 0;
    cartProducts.forEach(p => {
        total += (p.product.price * p.quantity);
        const li = document.createElement('li');
        li.innerHTML = `
            <h5>${p.product.name}</h5>
            <p>${p.product.description}<br>
            <b>$ ${p.product.price}</b><br>
            Cantidad: ${p.quantity}
            <button id="button-delete-from-cart-id${p.product._id}" type="button" class="btn btn-danger ms-2">Eliminar</button>
            </p>
        `;
        cartList.appendChild(li);

        // Delete product from cart
        document.getElementById(`button-delete-from-cart-id${p.product._id}`).addEventListener('click', async () => {
            // DELETE request to server
            const rawResponse = await fetch(`http://localhost:8080/api/carrito/${shoppingCartID}/productos/${p.product._id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            });
            const updatedCart = await rawResponse.json();
            showCartProducts(updatedCart);
        });
    });
    totalPrice.value = total.toFixed(2);
}