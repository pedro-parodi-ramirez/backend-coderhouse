import mongoose, { Schema } from 'mongoose';

const product = new Schema({
    timestamp: { type: Date, default: Date.now },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }    
});

export default mongoose.model('Product', product);