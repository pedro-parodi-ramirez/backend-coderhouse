import ContainerMemory from '../../containers/ContainerMemory.js';

class ChartDaoMemory extends ContainerMemory {

    /* Get all products from cart */
    getAllFromChart(idChart) {
        try {
            // Read product from cart
            let chart = this.array.find(c => c._id === idChart);

            if (chart !== undefined) {
                // Return products
                return chart.products;
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
    addToChart(idChart, product) {
        try {
            let succeed = false;

            // Search cart
            let chart = this.array.find(c => c._id === idChart);

            // Add product if cart exist
            if (chart !== undefined) {
                // If product exists, increase quantity. Otherwise add product to cart
                let inChartIndex = chart.products.findIndex(p => p.product._id === product._id);

                if (inChartIndex === -1) { chart.products.push({ product: product, quantity: 1 }) }
                else { chart.products[inChartIndex].quantity++ }
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
    deleteFromChart(idChart, idProduct) {
        try {
            let succeed = false;

            // Search cart
            let chart = this.array.find(c => c._id === idChart);

            if (chart !== undefined) {
                // Search product
                succeed = chart.products.some(p => p.product._id === idProduct);

                if (succeed) {
                    // Delete product
                    chart.products = chart.products.filter(p => p.product._id !== idProduct);
                }
            }
            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error deleting product from cart 🛒❌');
        }
    }
}

export default ChartDaoMemory;