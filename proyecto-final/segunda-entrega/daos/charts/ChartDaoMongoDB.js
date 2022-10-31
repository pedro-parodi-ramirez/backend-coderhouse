import { Schema } from 'mongoose';
import ContainerMongoDB from '../../containers/ContainerMongoDB.js'

class ChartDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('Chart', new Schema({
            timestamp: { type: Date, default: Date.now },
            products: {
                type: Array,
                default: []
            }
        }))
    }

    /* Obtener todos los productos de carrito existente */
    async getAllFromChart(idChart) {
        try {
            const query = await this.collection.find({ _id: idChart }, { products: 1, _id: 0 });
            return query[0].products;
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
            return response.modifiedCount;
        }
        catch (e) {
            throw new Error('🛒❌ Error al agregar producto a carrito 🛒❌');
        }
    }

    /* Eliminar producto por ID en carrito existente */
    async deleteFromChart(idChart, idProduct) {
        try {
            let response = await this.collection.updateOne({ _id: idChart }, { $pull: { "products": { "products._id": idProduct } } });
            // db.charts.updateOne({ _id: ObjectId('635f1bfb9f6358629fb8ba6e') }, { $pull: { "products": { "product._id": '635f03ae005f81888470fd06' } } });

            return response.modifiedCount && response.matchedCount;
        }
        catch (e) {
            console.log(e);
            throw new Error('🛒❌ Error al eliminar producto en carrito 🛒❌');
        }
    }
}

export default ChartDaoMongoDB;