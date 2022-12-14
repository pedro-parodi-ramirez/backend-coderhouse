module.exports = class DB {
  static nextID = 0; // Control de ID para productos

  /* Retornar todos los productos */
  static async getAllProducts() {
    try {
      console.log('π Lectura de productos desde DB π');
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
      console.log('πβ Error al buscar productos en la base de datos: βπ\n' + e.message);
    }
  }

  /* Retornar producto segΓΊn ID */
  static async getProductById(id) {
    try {
      console.log('π BΓΊsqueda de producto segΓΊn ID π');
      // Lectura de archivo con productos.
      const products = await readFileProducts();
      const productRequested = products.find(p => p.id === id);
      if (productRequested !== undefined) {
        console.log('π Se retorna producto solicitado π');
        return productRequested;
      }
      else {
        console.log('πβ Producto no encontrado βπ');
        return null;
      }
    }
    catch (e) {
      console.log('πβ Error al buscar producto en la base de datos: βπ\n' + e.message);
    }
  }

  /* Agregar producto */
  static async addProduct(data) {
    try {
      const fs = require('fs');
      // Se leen productos existentes
      const products = await DB.getAllProducts();

      // Se actualiza nextID
      DB.nextID = getNextID(products);

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

      // Se almacena nuevo producto en archivo
      await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
      console.log('π Se agrega producto a DB π');
    }
    catch (e) {
      console.log('πβ Error al agregar producto a la base de datos: βπ\n' + e.message);
    }
  }

  /* Actualizar producto segΓΊn ID */
  static async updateProduct(id, body) {
    try {
      const fs = require('fs');
      const products = await DB.getAllProducts();
      let found = false;

      // BΓΊsqueda y actualizaciΓ³n de producto
      products.forEach(p => {
        if (p.id === id) {
          let newPrice = parseFloat(parseFloat(body.precio).toFixed(2));
          console.log("newPrice", newPrice);
          console.log(typeof newPrice);

          // Se almacenan nuevos valores. En caso de que existan campos vacΓ­os, se mantiene el valor anterior al update.
          p.timestamp = Date.now();
          p.nombre = body.nombre || p.nombre;
          p.descripcion = body.descripcion || p.descripcion;
          p.codigo = body.codigo || p.codigo;
          p.foto = body.foto || p.foto;
          (!isNaN(newPrice)) && (p.precio = newPrice);
          p.stock = body.stock || p.stock;

          found = true;
          console.log('π Se actualiza producto en DB π');
        }
      })

      if (found) {
        // Se almacenan modificaciones en archivo
        await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
      }
      else {
        console.log('πβ Producto no encontrado βπ');
      }

      return found;
    }
    catch (e) {
      console.log('πβ Error al agregar producto a la base de datos: βπ\n' + e.message);
    }
  }

  /* Eliminar producto segΓΊn ID */
  static async deleteProduct(id) {
    try {
      const fs = require('fs');
      let products = await DB.getAllProducts();
      let found = products.some(p => p.id === id);

      if (found) {
        products = products.filter(p => p.id !== id);

        // Se almacenan modificaciones en archivo
        await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
        console.log('π Se elimina producto de DB π');
      }
      else {
        console.log('πβ Producto no encontrado βπ');
      }

      return found;
    }
    catch (e) {
      console.log('πβ Error al eliminar producto de la base de datos: βπ\n' + e.message);
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
    console.log('πβ Error al leer la base de datos de productos: βπ\n' + e.message);
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