import knex from 'knex';
import database from '../config/config.js';
import { schema, normalize, denormalize } from 'normalizr';
import { v4 as uuidv4 } from 'uuid';
import { writeFile, readFile } from 'fs/promises';

const idSchema = new schema.Entity('identifications');
const emailSchema = new schema.Entity('emails');
const nameSchema = new schema.Entity('names');
const lastNameSchema = new schema.Entity('lastNames');
const ageSchema = new schema.Entity('ages');
const aliasSchema = new schema.Entity('alias');
const avatarSchema = new schema.Entity('avatars');
const textSchema = new schema.Entity('texts')
const authorSchema = new schema.Entity('authors', {
    email: emailSchema,
    name: nameSchema,
    lastName: lastNameSchema,
    age: ageSchema,
    alias: aliasSchema,
    avatar: avatarSchema
}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('messages', {
    id: idSchema,
    author: authorSchema,
    text: [textSchema]
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
        const messages = await this.readMessages();
        const data = {
            id: uuidv4(),
            author: newMessage.author,
            text: newMessage.text
        }
        messages.push(data);
        await writeFile('./db/json/messages.json', JSON.stringify(messages, null, 2));
    }

    static async readMessages() {
        const data = await readFile('./db/json/messages.json', 'utf-8');
        return JSON.parse(data);
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