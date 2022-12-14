(async () => {
    const knex = require('knex');
    const database = require('../config/config');
    const DB = require("./db");

    console.log("ð Creando base de datos para mensajes ... ð");
    /* Tabla MENSAJES */
    let knexInstance = knex(database.sqlite3);

    // Se elimina tabla 'messages' si ya existe
    (await knexInstance.schema.hasTable('messages')) && (await knexInstance.schema.dropTable('messages'));

    // Tabla mensajes
    await knexInstance.schema.createTable('messages', (table) => {
        table.increments('id_message'),
            table.string('email'),
            table.timestamp('time').defaultTo(knexInstance.fn.now()),
            table.string('message')
    })

    // Se inicializan valores de productos y mensajes
    DB.addMessage({
        email: "Coderhouse",
        time: "",
        message: "Bienvenido!"
    });

    console.log("ðâ DB para mensajes creada âð");


    console.log("ð Creando base de datos para productos ... ð");
    /* Tabla PRODUCTOS */
    knexInstance = knex(database.sql);

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
        title: "CafÃ©",
        price: 522,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/coffee-172/100/Coffe-04-512.png"
    });

    console.log("ðâ DB para productos creada âð");
})(true)