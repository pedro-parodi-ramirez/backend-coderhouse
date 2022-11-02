import ContainerFirebase from '../../containers/ContainerFirebase.js';
import { FieldValue } from 'firebase-admin/firestore'

class ChartDaoFirebase extends ContainerFirebase {
    constructor() {
        super('charts');
    }

    /* Obtener todos los productos de carrito existente */
    async getAllFromChart(idChart) {
        try {
            // Búsqueda de elementos
            const snapshot = await this.collection.doc(idChart).get();
            const chartProducts = [...(snapshot.data().products)];
            return chartProducts;
        }
        catch (e) {
            throw new Error('🛒❌ Error al buscar productos en carrito 🛒❌');
        }
    }

    /* Agregar producto a carrito existente */
    async addToChart(idChart, product) {
        try {
            let succeed = false;
            const doc = await this.collection.doc(idChart);
            const snapshot = await doc.get();
            
            // Si carrito existe, se agrega producto
            if (snapshot.exists) {
                const chartProducts = [...(snapshot.data().products)];
                
                // Se evalúa si el producto ya existe en el carrito
                let inChartIndex = chartProducts.findIndex(c => c.product._id === product._id);

                // Se agrega producto a carrito
                if (inChartIndex === -1) { chartProducts.push({ product: product, quantity: 1 }) }
                else { chartProducts[inChartIndex].quantity++ }

                // Se actualiza en DB los cambios
                doc.set({ products: chartProducts });
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
            const doc = await this.collection.doc(idChart);
            const snapshot = await doc.get();
            
            // Si carrito existe, se elimina producto
            if (snapshot.exists) {
                let chartProducts = [...(snapshot.data().products)];
                
                // Se elimina producto
                chartProducts = chartProducts.filter(c => c.product._id !== idProduct);

                // Se actualiza en DB los cambios
                doc.set({ products: chartProducts });
                succeed = true;
            }
            return succeed;
        }
        catch (e) {
            throw new Error('🛒❌ Error al eliminar producto en carrito 🛒❌');
        }
    }
}

export default ChartDaoFirebase;