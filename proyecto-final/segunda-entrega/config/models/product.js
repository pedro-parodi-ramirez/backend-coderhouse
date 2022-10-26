import mongoose, { Schema } from 'mongoose'

const product = new Schema({
    timestamp: { type: Date, default: Date.now },
    name: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: String, require: true },
    image: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true }
});

export default mongoose.model('Product', product);