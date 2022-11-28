import mongoose, { Schema } from 'mongoose';

const user = new Schema({
    fullName: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
}, { timestamps: true })

export default mongoose.model('User', user);