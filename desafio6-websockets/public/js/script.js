(function () {
    const productTable = document.getElementById('product-table');
    const addProduct = document.getElementById('form-add-product');
    const inputTitle = document.getElementById('title');
    const inputPrice = document.getElementById('price');
    const inputThumbnail = document.getElementById('thumbnail');
    const messageList = document.getElementById('list-messages');
    const formMessage = document.getElementById('form-message');
    const inputUserEmail = document.getElementById('user-email');
    const inputUserMessage = document.getElementById('user-message');
    const socket = io();
    let template;
    let messages = []
    fetch('http://localhost:3000/templates/card-images.hbs')
        .then(response => response.text())
        .then(text => template = Handlebars.compile(text));

    socket.on('connect', () => {
        console.log('Conectado al servidor');
    });

    socket.on('init-products', (data) => {
        let urlGetProducts = data;
        fetch(urlGetProducts)
            .then(respose => respose.json())
            .then(response => {
                if (!response.isEmpty) {
                    const { products: products } = response;
                    const html = (products.map(products => template(products))).join('');
                    productTable.innerHTML = html;
                }
            });
    });

    socket.on('log-messages', logMessages => {
        messageList.innerHTML = '';
        messages = logMessages;
        messages.forEach(m => {
            const li = document.createElement('li');
            li.innerText = `${m.email}: ${m.message}`;
            messageList.appendChild(li);
        });
    });

    socket.on('new-message', newMessage => {
        messages.push(newMessage);
        const li = document.createElement('li');
        li.innerText = `${newMessage.email}: ${newMessage.message}`;
        messageList.appendChild(li);
    })

    socket.on('update-products', (data) => {
        productTable.innerHTML += template(data);
    });

    addProduct.addEventListener('submit', () => {
        let data = {
            title: inputTitle.value,
            price: inputPrice.value,
            thumbnail: inputThumbnail.value
        };
        socket.emit('new-product', data);
        //addProduct.reset();
    });

    formMessage.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            email: inputUserEmail.value,
            message: inputUserMessage.value
        };
        socket.emit('send-message', data)
        inputUserMessage.value = '';
        inputUserMessage.focus();
    })
})();