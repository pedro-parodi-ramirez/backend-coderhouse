import Product from './daos/Product.js';
import mongoose from 'mongoose';
import ProductModel from './models/product.js';
import { PASSWORD } from './variables.js';

const options = { dbName: 'ecommerce' };
const URL = `mongodb+srv://pedropr:${PASSWORD}@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority`;

export default class DB {
  /* Retornar todos los productos */
  static async getAllProducts() {
    try {
      console.log('📁 Lectura de productos desde DB 📁');
      // Lectura de archivo con productos.
      const products = await dbGetProducts();
      return products;
    }
    catch (e) {
      console.log('📁❌ Error al buscar productos en DB: ❌📁\n' + e.message);
    }
  }

  /* Retornar producto según ID */
  static async getProductById(id) {
    try {
      console.log('📁 Búsqueda de producto según ID 📁');
      // Lectura de archivo con productos.
      const products = await dbGetProducts();
      const productRequested = products.find(p => p.id === id.id);
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
      console.log('📁❌ Error al buscar producto en DB: ❌📁\n' + e.message);
    }
  }

  /* Agregar producto */
  static async addProduct(data) {
    try {
      // Se agrega nuevo producto
      const newProduct = new Product({
        timestamp: Date.now(),
        name: data.name,
        description: data.description,
        code: data.code,
        image: data.image,
        price: parseFloat(parseFloat(data.price).toFixed(2)),
        stock: parseInt(data.stock)
      });

      // Se agrega producto en DB
      await dbInsertProduct(newProduct);
      console.log('📁✔ Producto agregado en DB ✔📁');
    }
    catch (e) {
      console.log('📁❌ Error al insertar producto en DB: ❌📁\n' + e.message);
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
async function dbGetProducts() {
  try {
    await mongoose.connect(URL, options);

    // Lectura de productos en DB
    const products = await ProductModel.find({});
    return products;
  }
  catch (e) {
    console.log('📂❌ Error al buscar productos en DB 📂❌\n' + e.message);
    return [];
  }
}

// Insertar nuevo producto en la DB
async function dbInsertProduct(newProduct) {
  try {
    await mongoose.connect(URL, options);

    // Se inserta producto en DB
    const query = await ProductModel({
      timestamp: newProduct.timestamp,
      name: newProduct.name,
      description: newProduct.description,
      code: newProduct.code,
      image: newProduct.image,
      price: newProduct.price,
      stock: newProduct.stock
    });
    await query.save();
  }
  catch (e) {
    throw new Error(e.message);
  }
}