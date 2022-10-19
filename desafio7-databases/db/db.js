const knex = require('knex');
const database = require('../config/config');

module.exports = class DB {
    static async getProducts() {
        const products = await selectAllFromTable(database.sql, 'products');
        return products;
    }

    static async addProduct(newProduct) {
        const data = {
            title: newProduct.title,
            price: parseInt(newProduct.price),
            thumbnail: newProduct.thumbnail
        }
        await insertOnTable(database.sql, 'products', data);
    }

    static async addMessage(newMessage) {
        const data = {
            email: newMessage.email,
            time: newMessage.time,
            message: newMessage.message
        }
        await insertOnTable(database.sqlite3, 'messages', data);
    }

    static async readMessages() {
        const messages = selectAllFromTable(database.sqlite3, 'messages');
        return messages;
    }
}

async function selectAllFromTable(database, table) {
    const knexInstance = knex(database);
    return await knexInstance(table).select('*');
}

async function insertOnTable(database, table, newRegister) {
    const knexInstance = knex(database);
    await knexInstance(table).insert(newRegister);
}