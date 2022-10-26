import fs from 'fs';
import Product from './daos/Product.js';

export default class DB {
  static nextID = 0; // Control de ID para productos

  /* Retornar todos los productos */
  static async getAllProducts() {
    try {
      console.log('📁 Lectura de productos desde DB 📁');
      // Lectura de archivo con productos.
      const products = await readFileProducts();

      // Retorno de productos
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
      // Se leen productos existentes
      const products = await DB.getAllProducts();

      // Se actualiza nextID
      DB.nextID = getNextID(products);

      // Se agrega nuevo producto
      const newProduct = new Product({
        id: DB.nextID,
        timestamp: Date.now(),
        name: data.name,
        description: data.description,
        code: data.code,
        image: data.image,
        price: parseFloat(parseFloat(data.price).toFixed(2)),
        stock: parseInt(data.stock)
      });
      products.push(newProduct);

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
      const products = await DB.getAllProducts();
      let found = false;

      // Búsqueda y actualización de producto
      products.forEach(p => {
        if (p.id === id) {
          let newPrice = parseFloat(parseFloat(body.price).toFixed(2));
          let newStock = parseInt(body.stock)

          // Se almacenan nuevos valores. En caso de que existan campos vacíos, se mantiene el valor anterior al update.
          p.timestamp = Date.now();
          p.name = body.name || p.name;
          p.description = body.description || p.description;
          p.code = body.code || p.code;
          p.image = body.image || p.image;
          (!isNaN(newPrice)) && (p.price = newPrice);
          (!isNaN(newStock)) && (p.stock = newStock);

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
    const data = await fs.promises.readFile('./config/json/products.json', 'utf-8');
    const products = [];

    if (data != null) {
      let dataJSON = JSON.parse(data);
      dataJSON.forEach(p => {
        products.push(new Product({
          id: p.id,
          timestamp: p.timestamp,
          name: p.name,
          description: p.description,
          code: p.code,
          image: p.image,
          price: parseFloat(parseFloat(p.price).toFixed(2)),
          stock: parseInt(p.stock)
        }));
      });
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

// Buscar nuevo ID para producto
function getNextID(products) {
  const arrayID = products.map(p => p.id);
  let nextID;
  nextID = Math.max(...arrayID) + 1;
  ((nextID === -Infinity) || (nextID === null)) && (nextID = 0);
  return nextID;
}