module.exports = class Container{
    static productQty = 0;
    
    save = async (product) => {
        try{
            // Se agrega el producto al archivo y actualiza la cantidad total de productos
            const fs = require('fs');
            let dataJSON = [];
            
            // En caso de existan productos, primero se lee el arhivo.
            if( Container.productQty > 0 ){
                const data = await fs.promises.readFile('./products.json', 'utf-8')
                dataJSON = JSON.parse(data);
            }
            // Se agrega el producto a los existentes y se guarda en el archivo en formato JSON
            dataJSON.push({id: Container.productQty, product});
            await fs.promises.writeFile('./products.json', JSON.stringify(dataJSON, null, 2));
            
            Container.productQty++;
            return Container.productQty;
        }
        catch(e){
            console.log("✍ Error en la escritura del archivo: ✍\n" + e.message);
        }
    }

    getById = async(id) => {
        try{
            // Lectura del archivo
            const fs = require('fs');
            const data = await fs.promises.readFile('./products.json','utf-8');
            let dataJSON = JSON.parse(data);

            // Búsqueda del producto según ID
            let productSelected = dataJSON.find( (p) => (p.id == id) );
            (productSelected == undefined) && (productSelected = null);

            return productSelected;
        }
        catch(e){
            console.log("📖 Error en la lectura del archivo: 📖\n" + e.message);
        }
    }

    getAll = async() => {
        try{
            // Lectura del archivo
            const fs = require('fs');
            const data = await fs.promises.readFile('./products.json','utf-8');
            let dataJSON = JSON.parse(data);

            // Se actualiza la cantidad de productos
            Container.productQty = dataJSON.length;
            return dataJSON;
        }
        catch{
            console.log("📖 Error en la lectura del archivo: 📖\n" + e.message);
        }
    }

    deleteById = async(id) => {
        try{
            // Lectura del archivo
            const fs = require('fs');
            const data = await fs.promises.readFile('./products.json','utf-8');
            let dataJSON = JSON.parse(data);
            let success = false;

            // Se elimina producto según ID
            dataJSON = dataJSON.filter( (p) => {
                                        if(p.id != id){ return p; }
                                        else { success = true; }
                                    });
            
            // Se alcenan cambios en archivo
            await fs.promises.writeFile('./products.json', JSON.stringify(dataJSON));

            return success;
        }
        catch(e){
            console.log("📖 Error en la lectura del archivo: 📖\n" + e.message);
        }
    }

    deleteAll = async() => {
        const fs = require('fs');
        await fs.promises.writeFile('./products.json', '');
        Container.productQty = 0;
    }
}