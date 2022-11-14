import knex from 'knex';
import database from '../config/config.js';
import DB from './db.js';
import { readFile, writeFile } from 'fs/promises';

(async () => {
    console.log("📂 Creando base de datos para mensajes ... 📂");
    const knexInstance = knex(database.sql);
    let data = await readFile('./db/json/messages_init.json', 'utf-8');
    let messages = JSON.parse(data);
    
    // Se inicializan valores de productos y mensajes
    await writeFile('./db/json/messages.json', JSON.stringify(messages, null, 2));
    console.log("📂✔ DB para mensajes creada ✔📂");


    console.log("📂 Creando base de datos para productos ... 📂");
    /* Tabla PRODUCTOS */

    // Se elimina tabla 'productos' si ya existe
    (await knexInstance.schema.hasTable('products')) && (await knexInstance.schema.dropTable('products'));

    // Tabla productos
    await knexInstance.schema.createTable('products', (table) => {
        table.increments('id_product'),
            table.string('title'),
            table.float('price'),
            table.string('thumbnail')
    })

    DB.addProduct({
        title: "Leche",
        price: 68.59,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/food-set-4/64/Artboard_7-256.png"
    });
    DB.addProduct({
        title: "Azucar",
        price: 89.99,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/breakfast-time-1/32/breakfast_cute_drink_food_eat_3-Sugar-512.png"
    });
    DB.addProduct({
        title: "Café",
        price: 522,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/coffee-172/100/Coffe-04-512.png"
    });

    console.log("📂✔ DB para productos creada ✔📂");
})(true)