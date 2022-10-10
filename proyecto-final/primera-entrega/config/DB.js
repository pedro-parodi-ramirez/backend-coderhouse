module.exports = class DB {
  static productQty = 0;  // Cantidad de productos de diferentes tipo

  /* Agregar producto */
  static async addProduct(newProduct) {
    try {
      const fs = require('fs');
      console.log('📁Se agrega producto a DB📁');
      const products = await DB.getAllProducts();
      products.push({
        id: DB.productQty,
        timestamp: Date.now(),
        name: newProduct.name,
        description: newProduct.description,
        code: newProduct.code,
        imgURL: newProduct.imgURL,
        price: parseFloat(newProduct.price).toFixed(2),
        stock: newProduct.stock
      });

      console.log(products);

      // Se aumenta la cantidad de productos de diferente tipo
      DB.productQty++;
      
      // Se almacena nuevo producto en archivo
      await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
    }
    catch (e) {
      console.log('📁❌ Error al agregar producto a la base de datos: ❌📁\n' + e.message);
    }
  }

  /* Actualizar producto */
  static async updateProduct(id, body) {
    try {
      const fs = require('fs');
      console.log('📁Se actualiza producto en DB📁');
      const products = await DB.getAllProducts();
      let finded = false;

      products.map(p => {
        if(p.id === id){
          let newPrice = parseFloat(body.price).toFixed(2);

          // Se almacenan nuevos valores. En caso de que existan campos vacíos, se mantiene el valor anterior al update.
          p.timestamp = Date.now(),
          p.name = body.name || p.name,
          p.description = body.description || p.description,
          p.code = body.code || p.code,
          p.imgURL = body.imgURL || p.imgURL,
          (newPrice !== "NaN") && (p.price = newPrice),
          p.stock = body.stock || p.stock

          finded = true;
        }
      })

      // Se almacenan modificaciones en archivo
      await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));

      return finded;
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