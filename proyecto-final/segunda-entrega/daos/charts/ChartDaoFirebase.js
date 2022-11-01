import ContainerFirebase from '../../containers/ContainerFirebase.js';

class ChartDaoFirebase extends ContainerFirebase {
    constructor() {
        super('charts');
    }

    /* Obtener todos los productos de carrito existente */
    async getAllFromChart(idChart) {
        try {
            // Búsqueda de elementos
            const snapshot = await this.collection.get(idChart);
            const chartProducts = snapshot.docs.map(product => product.data().product);
            return chartProducts;
        }
        catch (e) {
            throw new Error('🛒❌ Error al buscar productos en carrito 🛒❌');
        }
    }

    /* Agregar producto a carrito existente */
    async addToChart(idChart, product) {
        try {
            // Si el producto existe, se aumenta la cantidad
            let response = await this.collection.updateOne({ _id: idChart, "products.product._id": product._id }, { $inc: { "products.$.quantity": 1 } });
            // En caso de que no exista, se agrega al array de productos en carrito
            if (response.modifiedCount === 0) {
                response = await this.collection.updateOne({ _id: idChart }, {
                    $push: { "products": { product, quantity: 1 } }
                });
            }
            return response.matchedCount && response.modifiedCount;
        }
        catch (e) {
            throw new Error('🛒❌ Error al agregar producto a carrito 🛒❌');
        }
    }

    /* Eliminar producto por ID en carrito existente */
    async deleteFromChart(idChart, idProduct) {
        try {
            let response = await this.collection.updateOne({ _id: idChart }, { $pull: { "products": { "product._id": idProduct } } });
            return response.matchedCount && response.modifiedCount;
        }
        catch (e) {
            throw new Error('🛒❌ Error al eliminar producto en carrito 🛒❌');
        }
    }
}

export default ChartDaoFirebase;