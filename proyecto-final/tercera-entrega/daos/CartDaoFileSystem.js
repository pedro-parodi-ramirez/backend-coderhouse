import ContainerFileSystem from '../containers/ContainerFileSystem.js';
import { config } from '../config/config.js';
import fs from 'fs';

class cartDaoFileSystem extends ContainerFileSystem {
    constructor(file) {
        super(`${config.fileSystem.path}/${file}`);
    }

    /* Get all products from cart */
    async getAllFromCart(idCart) {
        try {
            // Read product from cart
            let cartArray = await this.getAll();

            // Search cart
            let cart = cartArray.find(c => c._id === idCart);

            if (cart !== undefined) {
                // Return products
                return cart.products;
            }
            else {
                return null;
            }
        }
        catch (e) {
            throw new Error('🛒❌ Error getting products from cart 🛒❌');
        }
    }

    /* Add product to cart */
    async addToCart(idCart, product) {
        try {
            let succeed = false;
            // Read all carts
            let cartArray = await this.getAll();

            // Search cart
            let cart = cartArray.find(c => c._id === idCart);

            // Add product if cart exist
            if (cart !== undefined) {
                // If product exists, increase quantity. Otherwise add product to cart
                let inCartIndex = cart.products.findIndex(p => p.product._id === product._id);

                if (inCartIndex === -1) { cart.products.push({ product: product, quantity: 1 }) }
                else { cart.products[inCartIndex].quantity++ }

                // Update DB
                await fs.promises.writeFile(this.path, JSON.stringify(cartArray, null, 2));
                succeed = true;
            }
            else {
                succeed = false;
            }
            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error adding product to cart 🛒❌');
        }
    }

    /* Delete product from cart */
    async deleteFromCart(idCart, idProduct) {
        try {
            let succeed = false;
            // Read all carts
            let cartArray = await this.getAll();

            // Search cart
            let cart = cartArray.find(c => c._id === idCart);

            // If cart exist, delete product
            if (cart !== undefined) {
                // Search product
                succeed = cart.products.some(p => p.product._id === idProduct);

                if (succeed) {
                    // Delete product
                    cart.products = cart.products.filter(p => p.product._id !== idProduct);

                    // Update DB
                    await fs.promises.writeFile(this.path, JSON.stringify(cartArray, null, 2));
                }
            }

            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error deleting product from cart 🛒❌');
        }
    }
}

export default cartDaoFileSystem;