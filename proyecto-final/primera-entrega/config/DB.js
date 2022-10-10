module.exports = class DB {
  static nextID = 3; // Control de ID para productos

  /* Retornar todos los productos */
  static async getAllProducts() {
    console.log('📁 Lectura de productos desde DB 📁');
    // Lectura de archivo con productos.
    const products = await readFileProducts();
    if (products != null) {
      return products;
    }
    else {
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
      console.log('📁 Se retorna producto solicitado 📁');
      return productRequested;
    }
    else {
      console.log('📁❌ Producto no encontrado ❌📁');
      return null;
    }
  }

  /* Agregar producto */
  static async addProduct(newProduct) {
    try {
      const fs = require('fs');
      const products = await DB.getAllProducts();
      products.push({
        id: DB.nextID,
        timestamp: Date.now(),
        name: newProduct.name,
        description: newProduct.description,
        code: newProduct.code,
        imgURL: newProduct.imgURL,
        price: parseFloat(newProduct.price).toFixed(2),
        stock: newProduct.stock
      });
      DB.nextID++;

      // Se almacena nuevo producto en archivo
      await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
      console.log('📁 Se agrega producto a DB 📁');
    }
    catch (e) {
      console.log('📁❌ Error al agregar producto a la base de datos: ❌📁\n' + e.message);
    }
  }

  /* Actualizar producto según ID */
  static async updateProduct(id, body) {
    try {
      const fs = require('fs');
      const products = await DB.getAllProducts();
      let finded = false;

      products.map(p => {
        if (p.id === id) {
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
          console.log('📁 Se actualiza producto en DB 📁');
        }
      })

      if (finded) {
        // Se almacenan modificaciones en archivo
        await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
      }
      else {
        console.log('📁❌ Producto no encontrado ❌📁');
      }

      return finded;
    }
    catch (e) {
      console.log('📁❌ Error al agregar producto a la base de datos: ❌📁\n' + e.message);
    }
  }

  /* Eliminar producto según ID */
  static async deleteProduct(id) {
    try {
      const fs = require('fs');
      let products = await DB.getAllProducts();
      let finded = products.some(p => p.id === id);

      if (finded) {
        products = products.filter(p => p.id !== id);

        // Se almacenan modificaciones en archivo
        await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
        console.log('📁 Se elimina producto de DB 📁');
      }
      else{
        console.log('📁❌ Producto no encontrado ❌📁');
      }

      return finded;
    }
    catch (e) {
      console.log('📁❌ Error al eliminar producto de la base de datos: ❌📁\n' + e.message);
    }
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
      return null;
    }
  }
  catch (e) {
    console.log('📁❌ Error al leer la base de datos de productos: ❌📁\n' + e.message);
    return null;
  }
}