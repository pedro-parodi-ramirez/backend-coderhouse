import mongoose from 'mongoose';
import ProductModel from './models/product.js';
import { PASSWORD } from './variables.js';

const options = { dbName: 'ecommerce' };
const URL = `mongodb+srv://pedropr:${PASSWORD}@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority`;

(async () => {
    try {
        await mongoose.connect(URL, options);

        // Se eliminan colecciones previas, en caso de que existan
        await ProductModel.deleteMany({});

        await ProductModel.insertMany([
            {
                timestamp: 1665419816542,
                name: "Leche",
                description: "Leche Entera LA SERENÍSIMA 3% Sachet 1 L",
                code: "APL",
                image: "https://cdn0.iconfinder.com/data/icons/food-set-4/64/Artboard_7-256.png",
                price: 207.8,
                stock: 50
            },
            {
                timestamp: 1665419816543,
                name: "Café",
                description: "Café Instántaneo Suave Y Espumoso Arlistan Fra 170 Grm",
                code: "CCI",
                image: "https://cdn0.iconfinder.com/data/icons/coffee-172/100/Coffe-04-512.png",
                price: 1017.25,
                stock: 20
            },
            {
                timestamp: 1665419816544,
                name: "Azúcar",
                description: "Azúcar Superior Real LEDESMA 1 Kg",
                code: "ADC",
                image: "https://cdn0.iconfinder.com/data/icons/breakfast-time-1/32/breakfast_cute_drink_food_eat_3-Sugar-512.png",
                price: 229,
                stock: 60
            }
        ]);
        console.log('📂✔ Se agregaron productos a la ✔DB: 📂\n');
    }
    catch (e) {
        console.log('📂 Error al insertar datos en la DB: 📂\n' + e.message);
    }
})(true);