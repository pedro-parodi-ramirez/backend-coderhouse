import ContainerMemory from '../../containers/ContainerMemory.js';

class cartDaoMemory extends ContainerMemory {

    /* Get all products from cart */
    getAllFromCart(idCart) {
        try {
            // Read product from cart
            let cart = this.array.find(c => c._id === idCart);

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
    addToCart(idCart, product) {
        try {
            let succeed = false;

            // Search cart
            let cart = this.array.find(c => c._id === idCart);

            // Add product if cart exist
            if (cart !== undefined) {
                // If product exists, increase quantity. Otherwise add product to cart
                let inCartIndex = cart.products.findIndex(p => p.product._id === product._id);

                if (inCartIndex === -1) { cart.products.push({ product: product, quantity: 1 }) }
                else { cart.products[inCartIndex].quantity++ }
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
    deleteFromCart(idCart, idProduct) {
        try {
            let succeed = false;

            // Search cart
            let cart = this.array.find(c => c._id === idCart);

            if (cart !== undefined) {
                // Search product
                succeed = cart.products.some(p => p.product._id === idProduct);

                if (succeed) {
                    // Delete product
                    cart.products = cart.products.filter(p => p.product._id !== idProduct);
                }
            }
            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error deleting product from cart 🛒❌');
        }
    }
}

export default cartDaoMemory;