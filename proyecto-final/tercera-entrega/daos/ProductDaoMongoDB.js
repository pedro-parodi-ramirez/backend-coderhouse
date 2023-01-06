import { Schema } from 'mongoose';
import ControllerMongoDB from '../controllers/ControllerMongoDB.js'

class ProductDaoMongoDB extends ControllerMongoDB {
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