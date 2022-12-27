import { Schema } from 'mongoose';
import ContainerMongoDB from '../containers/ContainerMongoDB.js'

class cartDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('cart', new Schema({
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

    /* Get all products from cart */
    async getAllFromCart(idCart) {
        try {
            const query = await this.collection.find({ _id: idCart }, { products: 1, _id: 0 });
            return query[0].products;
        }
        catch (e) {
            throw new Error('🛒❌ Error getting products from cart 🛒❌');
        }
    }

    /* Add product to cart */
    async addToCart(idCart, product) {
        try {
            // If product exists, increase quantity. Otherwise add product to cart
            let response = await this.collection.updateOne({ _id: idCart, "products.product._id": product._id }, { $inc: { "products.$.quantity": 1 } });
            
            if (response.modifiedCount === 0) {
                response = await this.collection.updateOne({ _id: idCart }, {
                    $push: { "products": { product, quantity: 1 } }
                });
            }
            return response.matchedCount && response.modifiedCount;
        }
        catch (e) {
            throw new Error('🛒❌ Error adding product to cart 🛒❌');
        }
    }

    /* Delete product from cart */
    async deleteFromCart(idCart, idProduct) {
        try {
            let response = await this.collection.updateOne({ _id: idCart }, { $pull: { "products": { "product._id": idProduct } } });
            return response.matchedCount && response.modifiedCount;
        }
        catch (e) {
            throw new Error('🛒❌ Error deleting product from cart 🛒❌');
        }
    }
}

export default cartDaoMongoDB;