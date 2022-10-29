import mongoose from 'mongoose';
import { URI } from '../config/config.js';

const options = { dbName: 'ecommerce' };

await mongoose.connect(URI, options);

export default class ContainerMongoDB {
  constructor(modelName, schema) {
    this.collection = mongoose.model(modelName, schema);
  }

  /* Retornar todos los productos */
  async getAll() {
    try {
      console.log('📁 Lectura de productos desde DB 📁');
      const products = await this.collection.find({});
      return products;
    }
    catch (e) {
      throw new Error('📁❌ Error al buscar productos en DB ❌📁');
    }
  }

  /* Retornar producto según ID */
  async getById(id) {
    try {
      console.log('📁 Búsqueda de producto según ID 📁');
      const productRequested = await this.collection.find({ _id: id });
      return productRequested;
    }
    catch (e) {
      throw new Error('📁❌ Error al buscar producto en DB ❌📁\n');
    }
  }

  /* Agregar producto */
  async add(data) {
    try {
      // Se agrega nuevo producto
      await this.collection.create({
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
      throw new Error('📁❌ Error al agregar producto en DB ❌📁');
    }
  }

  /* Actualizar producto según ID */
  async update(id, body) {
    try {
      let newPrice = parseFloat(parseFloat(body.price).toFixed(2));
      let newStock = parseInt(body.stock)

      // Intento de modificar producto
      const response = await this.collection.updateOne({ _id: id }, {
        $set: {
          timestamp: Date.now(),
          name: body.name,
          description: body.description,
          code: body.code,
          image: body.image,
          price: newPrice,
          stock: newStock,
        }
      });

      if (response.modifiedCount > 0) {
        console.log('📁✔ Se actualiza producto en DB ✔📁');
        return true;
      }
      else {
        console.log('📁❌ Producto no encontrado en DB ❌📁');
        return false;
      }
    }
    catch (e) {
      throw new Error('📁❌ Error al modificar producto a la base de datos ❌📁');
    }
  }

  /* Eliminar producto según ID */
  async deleteById(id) {
    try {
      // Intento de eliminar producto
      const response = await this.collection.deleteOne({ _id: id });

      // Respuesta según el resultado de la operación
      if (response.deletedCount > 0) {
        console.log('📁✔ Se elimina producto de DB ✔📁');
        return true;
      }
      else {
        console.log('📁❌ Producto no encontrado en DB ❌📁');
        return false;
      }
    }
    catch (e) {
      throw new Error('📁❌ Error al eliminar producto de la base de datos ❌📁');
    }
  }
}