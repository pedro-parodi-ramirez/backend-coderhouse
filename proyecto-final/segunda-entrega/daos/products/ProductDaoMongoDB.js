import { Schema } from 'mongoose';
import ContainerMongoDB from '../../containers/ContainerMongoDB.js'

class ProductDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('Product', new Schema({
            timestamp: { type: Date, default: Date.now },
            name: { type: String, require: true },
            description: { type: String, require: true },
            code: { type: String, require: true },
            image: { type: String, require: true },
            image: { type: String, require: true },
            price: { type: Number, require: true },
            stock: { type: Number, require: true }
        }));
    }
}

export default ProductDaoMongoDB;