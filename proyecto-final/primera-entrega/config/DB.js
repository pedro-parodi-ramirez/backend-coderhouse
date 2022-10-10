module.exports = class DB {
  static productQty = 0;

  /* Agregar producto */
  static async addProduct(newProduct) {
    try {
      const fs = require('fs');
      console.log('📁Se agrega producto a DB📁');
      let title = newProduct.title;
      let price = parseFloat(newProduct.price);
      let thumbnail = newProduct.thumbnail;
      const products = await DB.getAllProducts();
      DB.productQty++;
      products.push({
        id: DB.productQty,
        title: title,
        price: price,
        thumbnail, thumbnail
      });
      await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
    }
    catch (e) {
      console.log('📁❌ Error al agregar producto a la base de datos: ❌📁\n' + e.message);
    }
  }

  /* Retornar todos los productos */
  static async getAllProducts() {
    console.log('📁 Lectura de productos desde DB 📁');
    // Lectura de archivo con productos.
    const products = await readFileProducts();
    if (products != null) {
      DB.productQty = products.length;
      return products;
    }
    else {
      DB.productQty = 0;
      return [];
    }
  }

  /* Retornar producto según ID */
  static async getProductById(id) {
    console.log('📁 Búsqueda de producto según ID 📁');
    // Lectura de archivo con productos.
    const products = await readFileProducts();
    const productRequested = products.filter(p => p.id === id);
    if (productRequested.length > 0) {
      return productRequested;
    }
    else {
      return null;
    }
  }

  /* Almacenar mensajes en archivo */
  static async addMessage(data) {
    const fs = require('fs');
    const newLine = `${data.email} [${data.time.DD}/${data.time.MM}/${data.time.YY} ${data.time.hh}:${data.time.mm}:${data.time.ss}]: ${data.message}`;
    await fs.promises.appendFile('./config/text/messages.txt', newLine + '\n');
  }
}

// Lectura de archivo con productos.
async function readFileProducts() {
  try {
    // Lectura del archivo
    const fs = require('fs');
    const data = await fs.promises.readFile('./config/json/products.json', 'utf-8');

    if (data != null) {
      let dataJSON = JSON.parse(data);
      return dataJSON;
    }
    else {
      DB.productQty = 0;
      return null;
    }
  }
  catch (e) {
    console.log('📁❌ Error al leer la base de datos: ❌📁\n' + e.message);
    return null;
  }
}