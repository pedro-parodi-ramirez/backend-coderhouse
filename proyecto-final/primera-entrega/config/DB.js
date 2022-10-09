let products = [];

module.exports = class DB {
  static productQty = 0;

  // Agrega nuevo producto a la DB.
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

  // Retorna de los productos disponibles en la DB.
  static async getAllProducts() {
    console.log('📁Lectura de productos desde DB📁');
    // Lectura de archivo con productos
    products = await readFile();
    DB.productQty = products.length;
    return products;
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
    console.log('📁 Error al leer la base de datos: 📁\n' + e.message);
  }
}