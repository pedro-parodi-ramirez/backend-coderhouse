import ContainerMemory from '../../containers/ContainerMemory.js';

class ChartDaoMemory extends ContainerMemory {
    /* Obtener todos los productos de carrito existente */
    async getAllFromChart(idChart) {
        try {
            // Búsqueda de carrito solicitado
            let chart = this.array.find(c => c._id === idChart);

            if (chart !== undefined) {
                // Retorno de productos
                return chart.products;
            }
            else {
                return null;
            }
        }
        catch (e) {
            throw new Error('🛒❌ Error al buscar productos en carrito 🛒❌');
        }
    }

    /* Agregar producto a carrito existente */
    async addToChart(idChart, product) {
        try {
            let succeed = false;

            // Búsqueda de carrito solicitado
            let chart = this.array.find(c => c._id === idChart);

            if (chart !== undefined) {
                // Se evalúa si el producto ya existe en el carrito
                let inChartIndex = chart.products.findIndex(p => p.product._id === product._id);

                // Se agrega producto a carrito
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
            throw new Error('🛒❌ Error al agregar producto a carrito 🛒❌');
        }
    }

    /* Eliminar producto por ID en carrito existente */
    async deleteFromChart(idChart, idProduct) {
        try {
            let succeed = false;

            // Búsqueda de carrito solicitado
            let chart = this.array.find(c => c._id === idChart);

            if (chart !== undefined) {
                // Búsqueda de producto a eliminar
                succeed = chart.products.some(p => p.product._id === idProduct);

                if (succeed) {
                    // Se elimina producto
                    chart.products = chart.products.filter(p => p.product._id !== idProduct);
                }
            }
            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error al eliminar producto en carrito 🛒❌');
        }
    }
}

export default ChartDaoMemory;