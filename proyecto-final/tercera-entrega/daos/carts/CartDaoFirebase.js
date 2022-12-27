import ContainerFirebase from '../../containers/ContainerFirebase.js';

class cartDaoFirebase extends ContainerFirebase {
    constructor() {
        super('carts');
    }

    /* Get all products from cart */
    async getAllFromCart(idCart) {
        try {
            // Read product from cart
            const snapshot = await this.collection.doc(idCart).get();
            const cartProducts = [...(snapshot.data().products)];
            return cartProducts;
        }
        catch (e) {
            throw new Error('🛒❌ Error getting products from cart 🛒❌');
        }
    }

    /* Add product to cart */
    async addToCart(idCart, product) {
        try {
            let succeed = false;
            const doc = await this.collection.doc(idCart);
            const snapshot = await doc.get();
            
            // Add product if cart exist
            if (snapshot.exists) {
                // If product exists, increase quantity. Otherwise add product to cart
                const cartProducts = [...(snapshot.data().products)];
                let inCartIndex = cartProducts.findIndex(c => c.product._id === product._id);

                if (inCartIndex === -1) { cartProducts.push({ product: product, quantity: 1 }) }
                else { cartProducts[inCartIndex].quantity++ }

                // Update DB
                doc.set({ products: cartProducts });
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
            const doc = await this.collection.doc(idCart);
            const snapshot = await doc.get();
            
            // If cart exist, delete product
            if (snapshot.exists) {
                let cartProducts = [...(snapshot.data().products)];
                
                // Delete product
                cartProducts = cartProducts.filter(c => c.product._id !== idProduct);

                // Update DB
                doc.set({ products: cartProducts });
                succeed = true;
            }
            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error deleting product from cart 🛒❌');
        }
    }
}

export default cartDaoFirebase;