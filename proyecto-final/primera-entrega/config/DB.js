module.exports = class DB {
  static nextID = 3; // Control de ID para productos

  /* Retornar todos los productos */
  static async getAllProducts() {
    try {
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
    catch (e) {
      console.log('📁❌ Error al buscar productos en la base de datos: ❌📁\n' + e.message);
    }
  }

  /* Retornar producto según ID */
  static async getProductById(id) {
    try {
      console.log('📁 Búsqueda de producto según ID 📁');
      // Lectura de archivo con productos.
      const products = await readFileProducts();
      const productRequested = products.find(p => p.id === id);
      if (productRequested !== undefined) {
        console.log('📁 Se retorna producto solicitado 📁');
        return productRequested;
      }
      else {
        console.log('📁❌ Producto no encontrado ❌📁');
        return null;
      }
    }
    catch (e) {
      console.log('📁❌ Error al buscar producto en la base de datos: ❌📁\n' + e.message);
    }
  }

  /* Agregar producto */
  static async addProduct(data) {
    try {
      const fs = require('fs');
      // Se leen productos existentes
      const products = await DB.getAllProducts();

      // Se agrega nuevo producto
      const newProduct = {
        id: DB.nextID,
        timestamp: Date.now(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: parseFloat(parseFloat(data.precio).toFixed(2)),
        stock: parseInt(data.stock)
      }
      products.push(newProduct);
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
      let found = false;

      products.map(p => {
        if (p.id === id) {
          let newPrice = parseFloat(body.price).toFixed(2);

          // Se almacenan nuevos valores. En caso de que existan campos vacíos, se mantiene el valor anterior al update.
          p.timestamp = Date.now(),
            p.nombre = body.nombre || p.nombre,
            p.descripcion = body.descripcion || p.descripcion,
            p.codigo = body.codigo || p.codigo,
            p.foto = body.foto || p.foto,
            (newPrice !== "NaN") && (p.precio = newPrice),
            p.stock = body.stock || p.stock

          found = true;
          console.log('📁 Se actualiza producto en DB 📁');
        }
      })

      if (found) {
        // Se almacenan modificaciones en archivo
        await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
      }
      else {
        console.log('📁❌ Producto no encontrado ❌📁');
      }

      return found;
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
      let found = products.some(p => p.id === id);

      if (found) {
        products = products.filter(p => p.id !== id);

        // Se almacenan modificaciones en archivo
        await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
        console.log('📁 Se elimina producto de DB 📁');
      }
      else {
        console.log('📁❌ Producto no encontrado ❌📁');
      }

      return found;
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