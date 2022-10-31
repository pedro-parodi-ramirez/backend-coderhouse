import mongoose, { Schema } from 'mongoose';
import ContainerMongoDB from '../../containers/ContainerMongoDB.js'

class ChartDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('Chart', new Schema({
            timestamp: { type: Date, default: Date.now },
            products: [new Schema({
                product: {
                    _id: { type: Schema.Types.ObjectId, required: true },
                    timestamp: { type: Date, default: Date.now },
                    name: { type: String, required: true },
                    description: { type: String, required: true },
                    code: { type: String, required: true },
                    image: { type: String, required: true },
                    image: { type: String, required: true },
                    price: { type: Number, required: true },
                    stock: { type: Number, required: true }
                },
                quantity: { type: Number, required: true }
            }, { _id: false })
            ]
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
            console.log(e);
            throw new Error('🛒❌ Error al agregar producto a carrito 🛒❌');
        }
    }

    /* Eliminar producto por ID en carrito existente */
    async deleteFromChart(idChart, idProduct) {
        try {
            let response = await this.collection.updateOne({ _id: idChart }, { $pull: { products: { "products._id": '63604fc9a187a092dadb83ca' } } });
            // db.charts.updateOne({ _id: ObjectId('636046ad3644785875febeba') }, { $pull: { "products": { "product._id": '635f03ae005f81888470fd05' } } });
            // db.charts.find({ _id: ObjectId('636055cce2cb8b63ec0671cd') }, { "products.product": 1, _id: 0 })

            return response.modifiedCount && response.matchedCount;
        }
        catch (e) {
            console.log(e);
            throw new Error('🛒❌ Error al eliminar producto en carrito 🛒❌');
        }
    }
}

export default ChartDaoMongoDB;