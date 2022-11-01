import mongoose from 'mongoose';
import { config } from '../config/config.js';

const options = { dbName: 'ecommerce' };

await mongoose.connect(config.mongoDB.URI, options);

export default class ContainerMongoDB {
  constructor(modelName, schema) {
    this.collection = mongoose.model(modelName, schema);
  }

  /* Retornar todos los elementos */
  async getAll() {
    try {
      const array = await this.collection.find({});
      return array;
    }
    catch (e) {
      throw new Error('📁❌ Error al buscar en DB ❌📁');
    }
  }

  /* Retornar elemento según ID */
  async getById(id) {
    try {
      const element = await this.collection.find({ _id: id });
      return element;
    }
    catch (e) {
      throw new Error('📁❌ Error al buscar en DB ❌📁');
    }
  }

  /* Agregar elemento */
  async create(data) {
    try {
      const response = await this.collection.create(data);
      return response.id;
    }
    catch (e) {
      throw new Error('📁❌ Error al agregar elemento en DB ❌📁');
    }
  }

  /* Actualizar elemento según ID */
  async update(id, data) {
    try {
      // Intento de modificar elemento
      const response = await this.collection.updateOne({ _id: id }, { $set: data });
      return response.modifiedCount;
    }
    catch (e) {
      throw new Error('📁❌ Error al modificar elemento en DB ❌📁');
    }
  }

  /* Eliminar elemento según ID */
  async deleteById(id) {
    try {
      // Intento de eliminar elemento
      const response = await this.collection.deleteOne({ _id: id });
      return response.deletedCount;
    }
    catch (e) {
      throw new Error('📁❌ Error al eliminar elemento en DB ❌📁');
    }
  }
}