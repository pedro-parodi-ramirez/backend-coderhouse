const Container = require('./Container.js');

const container = new Container();

class Product{
    constructor(title, price, url){
        this.title = title;
        this.price = price;
        this.url = url;
    }
}

(async function(){
    try{
        // Se agregan dos productos al objeto 'container'
        await container.save(new Product(
                                'Leche',
                                68.59,
                                'https://www.laserenisima.com.ar/images/productos/grandesachet3.png'));
        console.log("✔ Producto agregado! ✔\n");

        await container.save(new Product(
                                'Azucar',
                                89.99,
                                'https://www.casa-segal.com/wp-content/uploads/2019/03/azucar-kilo-ledesma-reposteria-mendoza-casa-segal-1-600x600.jpg'));
        console.log("✔ Producto agregado! ✔\n");

        await container.save(new Product(
            'Cafe',
            522,
            'https://http2.mlstatic.com/D_NQ_NP_726859-MLA45758824859_042021-O.webp'));
        console.log("✔ Producto agregado! ✔\n");
        
        console.log('********************************************************************************************************');

        // Búsqueda de un producto según ID
        const productSelected = await container.getById(1);
        if(productSelected != null){
            console.log("El producto seleccionado es:");
            console.log(productSelected);
        }
        else { console.log("❌ El producto no ha sido encontrado ❌\n"); }

        console.log('********************************************************************************************************');

        // Listar productos almacenados
        const allProducts = await container.getAll();
        if(allProducts != null){
            console.log("Lista de productos:");
            console.log(allProducts);
        }
        else { console.log("❌ No hay productos almaceados. ❌\n"); }

        console.log('********************************************************************************************************');

        // Se elimina producto según ID
        //let success = await container.deleteById(0);
        //if(success) { console.log("Producto eliminado!\n"); }
        //else { console.log("❌ No se encontró el producto. ❌\n"); }

        //console.log('********************************************************************************************************');

        // Se eliminan todos los productos
        //container.deleteAll();
        //console.log('☢ Todos los productos han sido eliminados. ☢');

    }
    catch(e){
        console.log("🛑 Ocurrió un error durante la ejecución del programa. 🛑" + e);
    }
})()

