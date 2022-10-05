(function () {
    const socket = io();
    const productTable = document.getElementById('product-table');
    const addProduct = document.getElementById('form-add-product');
    const inputTitle = document.getElementById('title');
    const inputPrice = document.getElementById('price');
    const inputThumbnail = document.getElementById('thumbnail');
    const messageList = document.getElementById('list-messages');
    const formMessage = document.getElementById('form-message');
    const inputUserEmail = document.getElementById('user-email');
    const inputUserMessage = document.getElementById('user-message');

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
        showMessages(logMessages);
    });

    socket.on('new-message', newMessage => {
        messages.push(newMessage);
        showMessages(newMessage);
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
        const date = new Date();
        const data = {
            email: inputUserEmail.value,
            time: {
                YY: date.getFullYear(),
                MM: date.getMonth(),
                DD: date.getDate(),
                hh: date.getHours(),
                mm: date.getMinutes(),
                ss: date.getSeconds()                
            },
            message: inputUserMessage.value
        };
        socket.emit('send-message', data)
        inputUserMessage.value = '';
        inputUserMessage.focus();
    });

    function showMessages(messages) {
        messages.forEach(m => {
            const li = document.createElement('li');
            li.innerHTML = `
                <b style="color:#6495ED">${m.email}</b>
                <span style="color:#CD7F32">[${m.time.DD}/${m.time.MM}/${m.time.YY} ${m.time.hh}:${m.time.mm}:${m.time.ss}]</span>:
                <i style="color:#00A36C">${m.message}</i>`;
            messageList.appendChild(li);
        });
    }
})();