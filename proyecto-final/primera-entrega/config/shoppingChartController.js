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

      // Retorno de ID de carrito y actualizaciΓ³n de nuevo ID.
      console.log('π Carrito de compras creado π');
      return newChart.id;
    }
    catch (e) {
      console.log(`πβ Error al crear carrito πβ\n ${e.message}`);
    }
  }

  /* Eliminar carrito de compras segΓΊn ID */
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
        console.log('π Carrito de compras eliminado π');
      }
      else {
        console.log('πβ Carrito de compras no encontrado βπ');
      }

      return found;
    }
    catch (e) {
      console.log(`πβ Error al eliminar carrito πβ\n ${e.message}`);
    }
  }

  /* Retornar productos de carrito existente segΓΊn ID */
  static async getFromChart(idChart) {
    try {
      const fs = require('fs');

      // Lectura de carritos existentes.
      let chartArray = await readFileShoppingCharts();

      // BΓΊsqueda de carrito solicitado
      let chart = chartArray.find(c => c.id === idChart);

      if (chart !== undefined) {
        // Retorno de productos
        return chart.products;
      }
      else {
        console.log('πβ Carrito de compras no encontrado βπ');
        return null;
      }
    }
    catch (e) {
      console.log(`πβ Error al buscar producto en carrito πβ\n ${e.message}`);
    }
  }

  /* Agregar producto a carrito existente */
  static async addToChart(idChart, idProduct) {
    try {
      const fs = require('fs');

      // Lectura de carritos existentes.
      let chartArray = await readFileShoppingCharts();

      // BΓΊsqueda de carrito solicitado
      let chart = chartArray.find(c => c.id === idChart);

      if (chart !== undefined) {
        // BΓΊsqueda de producto a agregar a carrito
        const productRequested = await DB.getProductById(idProduct);

        if (productRequested !== null) {
          // Se evalΓΊa si el producto ya existe en el carrito
          let inChartIndex = chart.products.findIndex(p => p.product.id === productRequested.id);

          // Se agrega producto a carrito
          if (inChartIndex === -1) { chart.products.push({ product: productRequested, cantidad: 1 }) }
          else { chart.products[inChartIndex].cantidad++ }

          // Se almacenan modificaciones en archivo
          await fs.promises.writeFile('./config/json/shoppingCharts.json', JSON.stringify(chartArray, null, 2));
          console.log('π Producto agregado a carrito π');

          // Se retornan los productos del carrito actualizados
          return chart.products;
        }
        else {
          console.log('πβ OperaciΓ³n cancelada βπ');
        }
      }
      else {
        console.log('πβ Carrito de compras no encontrado βπ');
      }

      // Si llegΓ³ a este punto, hubo algΓΊn error
      return null;
    }
    catch (e) {
      console.log(`πβ Error al agregar producto a carrito πβ\n ${e.message}`);
    }
  }

  /* Eliminar producto de carrito existente */
  static async deleteFromChart(idChart, idProduct) {
    try {
      let success = false;
      const fs = require('fs');

      // Lectura de carritos existentes.
      let chartArray = await readFileShoppingCharts();

      // BΓΊsqueda de carrito solicitado
      let chart = chartArray.find(c => c.id === idChart);

      if (chart !== undefined) {
        // BΓΊsqueda de producto a eliminar
        let found = chart.products.some(p => p.product.id === idProduct);

        if (found) {
          // Se elimina producto
          chart.products = chart.products.filter(p => p.product.id !== idProduct);

          // Se almacenan modificaciones en archivo
          await fs.promises.writeFile('./config/json/shoppingCharts.json', JSON.stringify(chartArray, null, 2));
          console.log('π Producto eliminado de carrito π');

          // Se retornan los productos del carrito actualizados
          return chart.products;
        }
        else {
          console.log('πβ El producto no existe en el carrito βπ');
        }
      }
      else {
        console.log('πβ Carrito de compras no encontrado βπ');
      }

      // Si llegΓ³ a este punto, hubo algΓΊn error
      return null;
    }
    catch (e) {
      console.log(`πβ Error al eliminar producto de carrito πβ\n ${e.message}`);
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
    console.log('πβ Error al leer la base de datos de carritos: βπ\n' + e.message);
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