import knex from 'knex';
import DB from '../db/db.js';
import { readFile, writeFile } from 'fs/promises';

(async () => {
    console.log("📂 Creando base de datos para mensajes ... 📂");
    let data = await readFile('./db/json/messages_init.json', 'utf-8');
    let messages = JSON.parse(data);
    
    // Se inicializan valores de productos y mensajes
    await writeFile('./db/json/messages.json', JSON.stringify(messages, null, 2));
    console.log("📂✔ DB para mensajes creada ✔📂");


    console.log("📂 Creando base de datos para productos ... 📂");
    
    /* Tabla PRODUCTOS */
    // console.log("📂✔ DB para productos creada ✔📂");
})(true)