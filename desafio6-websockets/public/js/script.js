(function () {
    const productContainer = document.getElementById('product-container');
    //const productList = document.getElementById('product-list');
    const socket = io();

    const text = `        
            <div class="col">
                <div class="card" style="width: 10rem;">
                <img src="{{this.thumbnail}}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{this.title}}</h5>
                    <p class="card-text">$ {{this.price}}</p>
                    </div>
                </div>
            </div>
    `;
    const template = Handlebars.compile(text);

    socket.on('connect', () => {
        console.log('Conectado al servidor');
    });

    socket.on('history-products', (data) => {
        let urlGetProducts = data;
        fetch(urlGetProducts)
            .then(respose => respose.json())
            .then(response => {
                const products = response.products;
                console.log(response.products);
                const result = products.map( products => template(products) );
                console.log(result);
                productContainer.innerHTML = `
                    <h2 class="mt-4">Productos disponibles</h2>
                    <div class="row row-cols-1 row-cols-md-4 g-4">
                        ${result}
                    <div>
                `;
                // if (!response.isEmpty) {
                //     console.log(response);
                //     let products = response.products;
                //     productList.innerHTML = '';
                //     products.forEach(p => {
                //         const li = document.createElement('li');
                //         li.innerHTML = p.title;
                //         productList.appendChild(li);
                //     });
                // }
            });
    });
})();