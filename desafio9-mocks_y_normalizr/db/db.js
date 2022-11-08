import knex from 'knex';
import database from '../config/config.js';
import { schema, normalize } from 'normalizr';
import { v4 as uuidv4 } from 'uuid';
import { writeFile, readFile } from 'fs/promises';

const emailSchema = new schema.Entity('emails');
const nameSchema = new schema.Entity('names');
const lastNameSchema = new schema.Entity('lastNames');
const ageSchema = new schema.Entity('ages');
const aliasSchema = new schema.Entity('alias');
const avatarSchema = new schema.Entity('avatars');
const commentSchema = new schema.Entity('comments');
const authorSchema = new schema.Entity('authors', {
    email: emailSchema,
    name: nameSchema,
    lastName: lastNameSchema,
    age: ageSchema,
    alias: aliasSchema,
    avatar: avatarSchema
},
    { idAttribute: 'email' }
);
const postSchema = new schema.Entity('posts', {
    authors: [authorSchema],
    comments: [commentSchema],
    messages: [{
        authors: authorSchema,
        comments: commentSchema
    }]
});

class DB {
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

    static async addMessage(newMessage) {
        const data = await this.readMessages();
        const comment = {
            id: uuidv4(),
            content: newMessage.content,
            timestamp: newMessage.timestamp
        }
        data[0].messages.push({
            id: uuidv4(),
            authors: newMessage.author,
            comments: comment,
        });

        await writeFile('./db/json/messages.json', JSON.stringify(data, null, 2));
        await this.readMessagesNormalized();
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