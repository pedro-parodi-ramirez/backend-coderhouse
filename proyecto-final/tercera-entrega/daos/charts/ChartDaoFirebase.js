import ContainerFirebase from '../../containers/ContainerFirebase.js';

class ChartDaoFirebase extends ContainerFirebase {
    constructor() {
        super('charts');
    }

    /* Get all products from cart */
    async getAllFromChart(idChart) {
        try {
            // Read product from cart
            const snapshot = await this.collection.doc(idChart).get();
            const chartProducts = [...(snapshot.data().products)];
            return chartProducts;
        }
        catch (e) {
            throw new Error('🛒❌ Error getting products from cart 🛒❌');
        }
    }

    /* Add product to cart */
    async addToChart(idChart, product) {
        try {
            let succeed = false;
            const doc = await this.collection.doc(idChart);
            const snapshot = await doc.get();
            
            // Add product if cart exist
            if (snapshot.exists) {
                // If product exists, increase quantity. Otherwise add product to cart
                const chartProducts = [...(snapshot.data().products)];
                let inChartIndex = chartProducts.findIndex(c => c.product._id === product._id);

                if (inChartIndex === -1) { chartProducts.push({ product: product, quantity: 1 }) }
                else { chartProducts[inChartIndex].quantity++ }

                // Update DB
                doc.set({ products: chartProducts });
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
    async deleteFromChart(idChart, idProduct) {
        try {
            let succeed = false;
            const doc = await this.collection.doc(idChart);
            const snapshot = await doc.get();
            
            // If cart exist, delete product
            if (snapshot.exists) {
                let chartProducts = [...(snapshot.data().products)];
                
                // Delete product
                chartProducts = chartProducts.filter(c => c.product._id !== idProduct);

                // Update DB
                doc.set({ products: chartProducts });
                succeed = true;
            }
            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error deleting product from cart 🛒❌');
        }
    }
}

export default ChartDaoFirebase;