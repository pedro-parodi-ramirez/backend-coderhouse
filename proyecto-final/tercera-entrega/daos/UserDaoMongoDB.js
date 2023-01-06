import { Schema } from 'mongoose';
import ControllerMongoDB from '../controllers/ControllerMongoDB.js'

class UserDaoMongoDB extends ControllerMongoDB {
    constructor() {
        super('User', new Schema({
            timestamp: { type: Date, default: Date.now },
            name: { type: String, required: true },
            email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
            password: { type: String, required: true }
        }));
    }

    /* Get user by email */
    async getByEmail(email) {
        try {
            const element = await this.collection.findOne({ email });
            return element;
        }
        catch (e) {
            console.log(e);
            console.log('📁❌ Error searching by email in DB ❌📁');
        }
    }
}

export default UserDaoMongoDB;