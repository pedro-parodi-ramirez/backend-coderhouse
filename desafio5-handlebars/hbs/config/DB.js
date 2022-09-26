module.exports = class DB{
    static productQty = 0;

    static saveAll = async (products) => {
        try{
            const fs = require('fs');
            
            // Se actualiza cantidad de productos
            DB.productQty = products.length;

            // Se sobreescribe el archivo con todos los productos
            await fs.promises.writeFile('./config/products.json', JSON.stringify(products, null, 2));
            
            return DB.productQty;
        }
        catch(e){
            console.log("✍ Error en guardar proudcos en la base de datos: ✍\n" + e.message);
        }
    }

    static getAll = async() => {
        try{
            // Lectura del archivo
            const fs = require('fs');
            const data = await fs.promises.readFile('./config/products.json','utf-8');

            if(data != null){            
                let dataJSON = JSON.parse(data);
                // Se actualiza la cantidad de productos
                DB.productQty = dataJSON.length;

                return dataJSON;
            }
            else{
                DB.productQty = 0;
                return null;
            }
        }
        catch(e){
            console.log('📖 Error al leer la base de datos: 📖\n' + e.message);
        }
    }

    static deleteAll = async() => {
        try{
            const fs = require('fs');
            await fs.promises.writeFile('./config/products.json', '');
            DB.productQty = 0;
        }
        catch(e){
            console.log('❌ Error al eliminar los registros de la base de datos ❌');
        }
    }
}