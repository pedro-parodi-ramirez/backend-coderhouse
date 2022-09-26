module.exports = class DB{
    static productQty = 0;

    saveAll = async (products) => {
        try{
            const fs = require('fs');
            
            // Se actualiza cantidad de productos
            DB.productQty = products.length;

            // Se sobreescribe el archivo con todos los productos
            await fs.promises.writeFile('./routers/products.json', JSON.stringify(products, null, 2));
            
            return DB.productQty;
        }
        catch(e){
            console.log("✍ Error en guardar proudcos en la base de datos: ✍\n" + e.message);
        }
    }

    getAll = async() => {
        try{
            // Lectura del archivo
            const fs = require('fs');
            const data = await fs.promises.readFile('./routers/products.json','utf-8');
            let dataJSON = JSON.parse(data);

            // Se actualiza la cantidad de productos
            DB.productQty = dataJSON.length;
            return dataJSON;
        }
        catch(e){
            console.log('📖 Error al leer la base de datos: 📖\n' + e.message);
        }
    }

    deleteAll = async() => {
        try{
            const fs = require('fs');
            await fs.promises.writeFile('./routers/products.json', '');
            DB.productQty = 0;
        }
        catch(e){
            console.log('❌ Error al eliminar los registros de la base de datos ❌');
        }
    }
}