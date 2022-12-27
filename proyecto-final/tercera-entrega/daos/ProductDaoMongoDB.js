import { Schema } from 'mongoose';
import ContainerMongoDB from '../containers/ContainerMongoDB.js'

class ProductDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('Product', new Schema({
            timestamp: { type: Date, default: Date.now },
            name: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: String, required: true },
            image: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true }
        }));
    }
}

export default ProductDaoMongoDB;