import mongoose, { Schema } from 'mongoose';
const PASSWORD = '3BDOYzW6BNOwzvI1';
const URI = `mongodb+srv://pedropr:${PASSWORD}@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority`;
const options = { dbName: 'ecommerce' };

(async () => {
    try {
        // Se conecta a la DB        
        await mongoose.connect(URI, options);

        // Se crea modelo del producto
        const ProductModel = mongoose.model('Product', new Schema({
            timestamp: { type: Date, default: Date.now },
            name: { type: String, require: true },
            description: { type: String, require: true },
            code: { type: String, require: true },
            image: { type: String, require: true },
            image: { type: String, require: true },
            price: { type: Number, require: true },
            stock: { type: Number, require: true }
        }));

        // Se eliminan colecciones previas, en caso de que existan
        await ProductModel.deleteMany({});

        await ProductModel.insertMany([
            {
                timestamp: 1665419816542,
                name: "Fideos",
                description: "Mostachol MATARAZZO Paquete 500 Gr",
                code: "APC",
                image: "https://cdn0.iconfinder.com/data/icons/pasta-flat/300/Noodles_8-256.png",
                price: 175.9,
                stock: 50
            },
            {
                timestamp: 1665419816543,
                name: "Leche",
                description: "Leche Entera LA SERENISIMA 3% Sachet 1 L",
                code: "APL",
                image: "https://cdn0.iconfinder.com/data/icons/food-set-4/64/Artboard_7-256.png",
                price: 207,
                stock: 20
            },
            {
                timestamp: 1665419816544,
                name: "Mermelada",
                description: "Mermelada Arándanos Bc La Campagnola Fra 390 Grm",
                code: "AADC",
                image: "https://cdn2.iconfinder.com/data/icons/bakery-kitchen-3/512/jam-jar-berries-256.png",
                price: 613.25,
                stock: 60
            },
            {
                timestamp: 1665419816545,
                name: "Yerba",
                description: "Yerba Mate Suave PLAYADITO 1 Kg",
                code: "ACCI",
                image: "https://cdn3.iconfinder.com/data/icons/argentina-3/504/tea-yerba-mate-drink-argentina-256.png",
                price: 748.6,
                stock: 50
            },
            {
                timestamp: 1665419816546,
                name: "Café",
                description: "Café Instántaneo Suave Y Espumoso Arlistan Fra 170 Grm",
                code: "ACCI",
                image: "https://cdn2.iconfinder.com/data/icons/coffee-19/450/Coffee_bag-256.png",
                price: 1017.25,
                stock: 20
            },
            {
                timestamp: 1665419816547,
                name: "Carne",
                description: "Milanesa Bola De Lomo Estancias Coto X KG",
                code: "ACD",
                image: "https://cdn3.iconfinder.com/data/icons/meat-14/50/14-256.png",
                price: 999.9,
                stock: 60
            },
            {
                timestamp: 1665419816548,
                name: "Pescado",
                description: "Filete De Merluza Despinado Fresco X Kg",
                code: "ADC",
                image: "https://cdn0.iconfinder.com/data/icons/simple-mix-outline/160/fish-256.png",
                price: 990,
                stock: 50
            },
            {
                timestamp: 1665419816549,
                name: "Vodka",
                description: "Vodka SMIRNOFF Bot 700 CC",
                code: "BA",
                image: "https://cdn3.iconfinder.com/data/icons/food-emoji/50/Vodka-256.png",
                price: 1527,
                stock: 20
            },
            {
                timestamp: 1665419816550,
                name: "Champagne",
                description: "Champaña Cosecha Espec. NORTON Bot 750 Cmq",
                code: "BA",
                image: "https://cdn3.iconfinder.com/data/icons/christmas-and-new-year-27/64/xmas-11-256.png",
                price: 970,
                stock: 60
            },
            {
                timestamp: 1665419816550,
                name: "Whiskey",
                description: "Whisky Johnnie Walker 750 Ml Red Label",
                code: "BA",
                image: "https://cdn0.iconfinder.com/data/icons/beverage-43/128/whiskey-alcohol-brandy-scotch-liquor-256.png",
                price: 3571.77,
                stock: 60
            }
        ]);
        console.log('📂✔ Se agregaron productos a la ✔DB: 📂\n');
    }
    catch (e) {
        console.log('📂 Error al insertar datos en la DB: 📂\n' + e.message);
    }
})(true);