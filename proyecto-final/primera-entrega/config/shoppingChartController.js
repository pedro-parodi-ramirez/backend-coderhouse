const DB = require('./DB');

module.exports = class shoppingChartController {
  static nextID = 0;  // Control de ID para carritos

  /* Crear nuevo carrito de compras */
  static async createChart() {
    try {
      const fs = require('fs');

      // Lectura de carritos existentes.
      const chartArray = await readFileShoppingCharts();

      // Se actualiza nextID
      shoppingChartController.nextID = getNextID(chartArray);

      // Formato de nuevo carrito de compras.
      const newChart = {
        id: shoppingChartController.nextID,
        timestamp: Date.now(),
        products: []
      }

      // Se agrega nuevo carrrito al array existente
      chartArray.push(newChart);

      // Se almacena nuevo carrito en archivo.
      await fs.promises.writeFile('./config/json/shoppingCharts.json', JSON.stringify(chartArray, null, 2));

      // Retorno de ID de carrito y actualización de nuevo ID.
      console.log('🛒 Carrito de compras creado 🛒');
      return newChart.id;
    }
    catch (e) {
      console.log(`🛒❌ Error al crear carrito 🛒❌\n ${e.message}`);
    }
  }

  /* Eliminar carrito de compras según ID */
  static async deleteChart(id) {
    try {
      const fs = require('fs');

      // Lectura de carritos existentes.
      let chartArray = await readFileShoppingCharts();

      let found = chartArray.some(c => c.id === id);

      if (found) {
        chartArray = chartArray.filter(c => c.id !== id);

        // Se almacenan modificaciones en archivo
        await fs.promises.writeFile('./config/json/shoppingCharts.json', JSON.stringify(chartArray, null, 2));
        console.log('🛒 Carrito de compras eliminado 🛒');
      }
      else {
        console.log('🛒❌ Carrito de compras no encontrado ❌🛒');
      }

      return found;
    }
    catch (e) {
      console.log(`🛒❌ Error al eliminar carrito 🛒❌\n ${e.message}`);
    }
  }

  /* Retornar productos de carrito existente según ID */
  static async getFromChart(idChart) {
    try {
      const fs = require('fs');

      // Lectura de carritos existentes.
      let chartArray = await readFileShoppingCharts();

      // Búsqueda de carrito solicitado
      let chart = chartArray.find(c => c.id === idChart);

      if (chart !== undefined) {
        // Retorno de productos
        return chart.products;
      }
      else {
        console.log('🛒❌ Carrito de compras no encontrado ❌🛒');
        return null;
      }
    }
    catch (e) {
      console.log(`🛒❌ Error al buscar producto en carrito 🛒❌\n ${e.message}`);
    }
  }

  /* Agregar producto a carrito existente */
  static async addToChart(idChart, idProduct) {
    try {
      const fs = require('fs');

      // Lectura de carritos existentes.
      let chartArray = await readFileShoppingCharts();

      // Búsqueda de carrito solicitado
      let chart = chartArray.find(c => c.id === idChart);

      if (chart !== undefined) {
        // Búsqueda de producto a agregar a carrito
        const productRequested = await DB.getProductById(idProduct);

        if (productRequested !== null) {
          // Se evalúa si el producto ya existe en el carrito
          let inChartIndex = chart.products.findIndex(p => p.product.id === productRequested.id);

          // Se agrega producto a carrito
          if (inChartIndex === -1) { chart.products.push({ product: productRequested, cantidad: 1 }) }
          else { chart.products[inChartIndex].cantidad++ }

          // Se almacenan modificaciones en archivo
          await fs.promises.writeFile('./config/json/shoppingCharts.json', JSON.stringify(chartArray, null, 2));
          console.log('🛒 Producto agregado a carrito 🛒');

          // Se retornan los productos del carrito actualizados
          return chart.products;
        }
        else {
          console.log('🛒❌ Operación cancelada ❌🛒');
        }
      }
      else {
        console.log('🛒❌ Carrito de compras no encontrado ❌🛒');
      }

      // Si llegó a este punto, hubo algún error
      return null;
    }
    catch (e) {
      console.log(`🛒❌ Error al agregar producto a carrito 🛒❌\n ${e.message}`);
    }
  }

  /* Eliminar producto de carrito existente */
  static async deleteFromChart(idChart, idProduct) {
    try {
      let success = false;
      const fs = require('fs');

      // Lectura de carritos existentes.
      let chartArray = await readFileShoppingCharts();

      // Búsqueda de carrito solicitado
      let chart = chartArray.find(c => c.id === idChart);

      if (chart !== undefined) {
        // Búsqueda de producto a eliminar
        let found = chart.products.some(p => p.id === idProduct);

        if (found) {
          // Se elimina producto
          chart.products = chart.products.filter(p => p.id !== idProduct);

          // Se almacenan modificaciones en archivo
          await fs.promises.writeFile('./config/json/shoppingCharts.json', JSON.stringify(chartArray, null, 2));
          console.log('🛒 Producto eliminado de carrito 🛒');
          success = true;
        }
        else {
          console.log('🛒❌ El producto no existe en el carrito ❌🛒');
        }
      }
      else {
        console.log('🛒❌ Carrito de compras no encontrado ❌🛒');
      }
      return success;
    }
    catch (e) {
      console.log(`🛒❌ Error al eliminar producto de carrito 🛒❌\n ${e.message}`);
    }
  }
}

// Lectura de archivo con carritos existentes.
async function readFileShoppingCharts() {
  try {
    // Lectura del archivo
    const fs = require('fs');
    const data = await fs.promises.readFile('./config/json/shoppingCharts.json', 'utf-8');

    if (data !== null) {
      let dataJSON = JSON.parse(data);
      return dataJSON;
    }
    else {
      return [];
    }
  }
  catch (e) {
    console.log('🛒❌ Error al leer la base de datos de carritos: ❌🛒\n' + e.message);
    return [];
  }
}

// Buscar nuevo ID para carrito
function getNextID(chartArray) {
  const arrayID = chartArray.map(p => p.id);
  let nextID;
  nextID = Math.max(...arrayID) + 1;
  ((nextID === -Infinity) || (nextID === null)) && (nextID = 0);
  return nextID;
}