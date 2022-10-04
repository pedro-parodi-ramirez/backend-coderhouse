const products = [
  {
    "id": 1,
    "title": "Leche",
    "price": 68.59,
    "thumbnail": "https://cdn0.iconfinder.com/data/icons/food-set-4/64/Artboard_7-256.png"
  },
  {
    "id": 2,
    "title": "Azucar",
    "price": 89.99,
    "thumbnail": "https://cdn0.iconfinder.com/data/icons/breakfast-time-1/32/breakfast_cute_drink_food_eat_3-Sugar-512.png"
  },
  {
    "id": 3,
    "title": "Café",
    "price": 522,
    "thumbnail": "https://cdn0.iconfinder.com/data/icons/coffee-172/100/Coffe-04-512.png"
  }
]

module.exports = class DB {
  static productQty = products.length;

  static addProduct(newProduct) {
    console.log('📁Se agrega producto a DB📁');
    let title = newProduct.title;
    let price = parseFloat(newProduct.price);
    let thumbnail = newProduct.thumbnail;
    DB.productQty++;
    products.push({
      id: DB.productQty,
      title: title,
      price: price,
      thumbnail, thumbnail
    });
  }

  static getAllProducts() {
    console.log('📁Lectura de productos desde DB📁');
    return products;
  }
}

// // Lectura de archivo con productos
// let products;
// (async function () {
//     try {
//         // Lectura del archivo
//         const fs = require('fs');
//         const data = await fs.promises.readFile('./config/products.json', 'utf-8');

//         if (data != null) {
//             let dataJSON = JSON.parse(data);
//             // Se actualiza la cantidad de productos
//             DB.productQty = dataJSON.length;

//             products = dataJSON;
//         }
//         else {
//             DB.productQty = 0;
//             products = null;
//         }
//     }
//     catch (e) {
//         console.log('📁 Error al leer la base de datos: 📁\n' + e.message);
//     }
// })(true)