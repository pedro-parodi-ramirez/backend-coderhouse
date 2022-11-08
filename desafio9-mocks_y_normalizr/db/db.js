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
const messageScheme = new schema.Entity('messages', {
    authors: [authorSchema],
    comments: [commentSchema]
});

// const commentSchema = new schema.Entity('comments');
// const authorSchema = new schema.Entity('authors');
// const messageScheme = new schema.Entity('messages', {
//     author: authorSchema,
//     comments: [commentSchema]
// });
// const blog = {
//     id: 'asd',
//     author: {
//         id: '3',
//         nombre: 'Marcos'
//     },
//     comments: [
//         {
//             id: '1',
//             author: 'Hector',
//             content: "hola"
//         },
//         {
//             id: '2',
//             author: 'Belen',
//             content: "chau"
//         }
//     ]
// }
// const normalized = normalize(blog, messageScheme);
// console.log("Normalized", JSON.stringify(normalized));

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
        
        const message = {
            id: uuidv4(),
            content: newMessage.text
        }
        data[0].comments.push(message);
        data[0].authors.push(newMessage.author);

        const normalized = normalize(data[0], messageScheme);
        console.log("Normalized", JSON.stringify(normalized));
        await writeFile('./db/json/messages.json', JSON.stringify(data, null, 2));
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



/*
static async addMessage(newMessage) {
        const data = await this.readMessages();
        console.log("Original", data);

        const message = {
            // author: newMessage.author,
            id: uuidv4(),
            content: newMessage.text
        }
        data[0].comments.push(message);
        // data[0].authors.push(newMessage.author);

        const normalized = normalize(data[0], messageScheme);
        console.log("Normalized", JSON.stringify(normalized));
        await writeFile('./db/json/messages.json', JSON.stringify(data, null, 2));
    }

JSON
[
  {
    "id": "Pedro", // hard-codeado
    "comments": [
      {
        "id": "6123b59e-0c36-4703-b01c-4d9a3af16d31",
        "content": "asd"
      },
      {
        "id": "2354481d-8b52-4c54-9e4b-1074b7c80e2e",
        "content": "1qwetry"
      }
    ]
  }
]
*/