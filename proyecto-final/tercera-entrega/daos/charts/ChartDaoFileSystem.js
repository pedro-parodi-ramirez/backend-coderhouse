import ContainerFileSystem from '../../containers/ContainerFileSystem.js';
import { config } from '../../config/config.js';
import fs from 'fs';

class ChartDaoFileSystem extends ContainerFileSystem {
    constructor(file) {
        super(`${config.fileSystem.path}/${file}`);
    }

    /* Get all products from cart */
    async getAllFromChart(idChart) {
        try {
            // Read product from cart
            let chartArray = await this.getAll();

            // Search cart
            let chart = chartArray.find(c => c._id === idChart);

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
    async addToChart(idChart, product) {
        try {
            let succeed = false;
            // Read all carts
            let chartArray = await this.getAll();

            // Search cart
            let chart = chartArray.find(c => c._id === idChart);

            // Add product if cart exist
            if (chart !== undefined) {
                // If product exists, increase quantity. Otherwise add product to cart
                let inChartIndex = chart.products.findIndex(p => p.product._id === product._id);

                if (inChartIndex === -1) { chart.products.push({ product: product, quantity: 1 }) }
                else { chart.products[inChartIndex].quantity++ }

                // Update DB
                await fs.promises.writeFile(this.path, JSON.stringify(chartArray, null, 2));
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
            // Read all carts
            let chartArray = await this.getAll();

            // Search cart
            let chart = chartArray.find(c => c._id === idChart);

            // If cart exist, delete product
            if (chart !== undefined) {
                // Search product
                succeed = chart.products.some(p => p.product._id === idProduct);

                if (succeed) {
                    // Delete product
                    chart.products = chart.products.filter(p => p.product._id !== idProduct);

                    // Update DB
                    await fs.promises.writeFile(this.path, JSON.stringify(chartArray, null, 2));
                }
            }

            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error deleting product from cart 🛒❌');
        }
    }
}

export default ChartDaoFileSystem;