import knex from 'knex';
import database from '../config/config.js';
import { schema, normalize } from 'normalizr';
import { v4 as uuidv4 } from 'uuid';
import { writeFile, readFile } from 'fs/promises';
import mongoose from 'mongoose';
import UserModel from '../models/user.js';

const options = { dbName: 'challenge' };
const commentSchema = new schema.Entity('comments');
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' }
);
const postSchema = new schema.Entity('posts', {
    messages: [{
        authors: authorSchema,
        comments: commentSchema
    }]
});

await mongoose.connect(process.env.MONGO_URI, options);

class DB {
    /* PRODUCTS */
    static async getProducts() {
        const products = await selectAllFromTable(database.sql, 'products');
        return products;
    }

    static async addProduct(newProduct) {
        const data = {
            title: newProduct.title,
            price: parseFloat(newProduct.price),
            thumbnail: newProduct.thumbnail
        }
        await insertOnTable(database.sql, 'products', data);
    }

    /* MESSAGES */
    static async addMessage(newMessage) {
        const data = await this.readMessages();
        const comment = {
            id: uuidv4(),
            content: newMessage.content,
            timestamp: newMessage.timestamp
        }

        data[0].messages.push({
            authors: newMessage.author,
            comments: comment,
        });

        await writeFile('./db/json/messages.json', JSON.stringify(data, null, 2));
    }

    static async readMessages() {
        const data = await readFile('./db/json/messages.json', 'utf-8');
        return JSON.parse(data);
    }

    static async readMessagesNormalized() {
        const data = await this.readMessages();
        const normalized = normalize(data[0], postSchema);
        return normalized;
    }

    /* USERS */
    static createUser(data) {
        return UserModel.create(data);
    }

    static getUser(query = {}) {
        return UserModel.find(query);
    }

    static getUserByid(id) {
        return UserModel.findById(id);
    }

    static uploadUserById(id, data) {
        return UserModel.updateOne({ _id: id }, { $set: data });
    }

    static deleteUserById(id) {
        return UserModel.deleteOne({ _id: id });
    }
}

export default DB;

async function selectAllFromTable(database, table) {
    const knexInstance = knex(database);
    return await knexInstance(table).select('*');
}

async function insertOnTable(database, table, newRegister) {
    const knexInstance = knex(database);
    await knexInstance(table).insert(newRegister);
}