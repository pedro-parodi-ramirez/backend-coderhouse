import mongoose from 'mongoose';
import { URI } from '../config/config.js';

const options = { dbName: 'ecommerce' };

await mongoose.connect(URI, options);

export default class ContainerMongoDB {
  constructor(modelName, schema) {
    this.collection = mongoose.model(modelName, schema);
  }

  /* Retornar todos los productos */
  async getAllProducts() {
    try {
      console.log('📁 Lectura de productos desde DB 📁');
      const products = await this.collection.find({});
      return products;
    }
    catch (e) {
      console.log('📁❌ Error al buscar productos en DB: ❌📁\n' + e.message);
      return [];
    }
  }

  /* Retornar producto según ID */
  async getProductById(id) {
    try {
      console.log('📁 Búsqueda de producto según ID 📁');
      const productRequested = await this.collection.find({ _id: id });
      return productRequested;
    }
    catch (e) {
      console.log('📁❌ Error al buscar producto en DB: ❌📁\n' + e.message);
    }
  }

  /* Agregar producto */
  async addProduct(data) {
    try {
      // Se agrega nuevo producto
      this.collection.create({
        timestamp: Date.now(),
        name: data.name,
        description: data.description,
        code: data.code,
        image: data.image,
        price: parseFloat(parseFloat(data.price).toFixed(2)),
        stock: parseInt(data.stock)
      });
      console.log('📁✔ Producto agregado en DB ✔📁');
    }
    catch (e) {
      console.log('📁❌ Error al insertar producto en DB: ❌📁\n' + e.message);
    }
  }

  // /* Actualizar producto según ID */
  // static async updateProduct(id, body) {
  //   try {
  //     const products = await DB.getAllProducts();
  //     let found = false;

  //     // Búsqueda y actualización de producto
  //     products.forEach(p => {
  //       if (p.id === id) {
  //         let newPrice = parseFloat(parseFloat(body.price).toFixed(2));
  //         let newStock = parseInt(body.stock)

  //         // Se almacenan nuevos valores. En caso de que existan campos vacíos, se mantiene el valor anterior al update.
  //         p.timestamp = Date.now();
  //         p.name = body.name || p.name;
  //         p.description = body.description || p.description;
  //         p.code = body.code || p.code;
  //         p.image = body.image || p.image;
  //         (!isNaN(newPrice)) && (p.price = newPrice);
  //         (!isNaN(newStock)) && (p.stock = newStock);

  //         found = true;
  //         console.log('📁 Se actualiza producto en DB 📁');
  //       }
  //     })

  //     if (found) {
  //       // Se almacenan modificaciones en archivo
  //       await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
  //     }
  //     else {
  //       console.log('📁❌ Producto no encontrado ❌📁');
  //     }

  //     return found;
  //   }
  //   catch (e) {
  //     console.log('📁❌ Error al agregar producto a la base de datos: ❌📁\n' + e.message);
  //   }
  // }

  // /* Eliminar producto según ID */
  // static async deleteProduct(id) {
  //   try {
  //     let products = await DB.getAllProducts();
  //     let found = products.some(p => p.id === id);

  //     if (found) {
  //       products = products.filter(p => p.id !== id);

  //       // Se almacenan modificaciones en archivo
  //       await fs.promises.writeFile('./config/json/products.json', JSON.stringify(products, null, 2));
  //       console.log('📁 Se elimina producto de DB 📁');
  //     }
  //     else {
  //       console.log('📁❌ Producto no encontrado ❌📁');
  //     }

  //     return found;
  //   }
  //   catch (e) {
  //     console.log('📁❌ Error al eliminar producto de la base de datos: ❌📁\n' + e.message);
  //   }
  // }

  /* Eliminar todos los productos */
  async deleteAll(){
    this.collection.deleteMany({});
  }
}