//let products = [];

module.exports = class DB {
  static productQty = 0;

  // Agrega nuevo producto a la DB.
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
      await fs.promises.writeFile('./config/products.json', JSON.stringify(products, null, 2));
    }
    catch (e) {
      console.log('📁❌ Error al agregar producto a la base de datos: ❌📁\n' + e.message);
    }
  }

  // Retorna de los productos disponibles en la DB.
  static async getAllProducts() {
    console.log('📁Lectura de productos desde DB📁');
    // Lectura de archivo con productos
    const products = await readFile();
    if (products != null) {
      (DB.productQty = products.length);
      return products;
    }
    else {
      (DB.productQty = 0);
      return [];
    }
  }

  // Se agrega nuevo mensaje recibido, por un cliente, a un archivo de texto como registro histórico.
  static async addMessage(data) {
    const fs = require('fs');
    const newLine = `${data.email} [${data.time.DD}/${data.time.MM}/${data.time.YY} ${data.time.hh}:${data.time.mm}:${data.time.ss}]: ${data.message}`;
    await fs.promises.appendFile('./config/messages.txt', newLine + '\n');
  }
}

// Le archivo con productos y los devuelve, o devuelve null si no existiera ninguno.
async function readFile() {
  try {
    // Lectura del archivo
    const fs = require('fs');
    const data = await fs.promises.readFile('./config/products.json', 'utf-8');

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