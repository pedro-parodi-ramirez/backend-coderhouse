import mongoose from 'mongoose';
import { config } from '../config/config.js';

const options = { dbName: 'ecommerce' };

await mongoose.connect(config.mongoDB.URI, options);

export default class ControllerMongoDB {
  constructor(modelName, schema) {
    this.collection = mongoose.model(modelName, schema);
  }

  /* Return all elements */
  async getAll() {
    try {
      const array = await this.collection.find({});
      return array;
    }
    catch (e) {
      throw new Error('📁❌ Error searching in DB ❌📁');
    }
  }

  /* Search element based on ID */
  async getById(id) {
    try {
      const element = await this.collection.find({ _id: id });
      return element;
    }
    catch (e) {
      throw new Error('📁❌ Error searching in DB ❌📁');
    }
  }

  /* Add element */
  async create(data) {
    try {
      const response = await this.collection.create(data);
      return response.id;
    }
    catch (e) {
      throw new Error('📁❌ Error adding to DB ❌📁');
    }
  }

  /* Update based on ID */
  async update(id, data) {
    try {
      // Update element if it exists
      const response = await this.collection.updateOne({ _id: id }, { $set: data });
      return response.modifiedCount;
    }
    catch (e) {
      throw new Error('📁❌ Error updating in DB ❌📁');
    }
  }

  /* Delete element based on ID */
  async deleteById(id) {
    try {
      // Delete element if it exists
      const response = await this.collection.deleteOne({ _id: id });
      return response.deletedCount;
    }
    catch (e) {
      throw new Error('📁❌ Error deleting from DB ❌📁');
    }
  }
}