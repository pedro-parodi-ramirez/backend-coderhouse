module.exports = class shoppingChartController {
  static nextID = 0;  // Control de ID para carritos

  /* Crear nuevo carrito de compras */
  static async addChart() {
    try {
      const fs = require('fs');

      // Lectura de carritos existentes.
      const chartArray = await readFileShoppingCharts();
      
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
      shoppingChartController.nextID++;
      return newChart.id;
    }
    catch (e) {
      console.log(`🛒❌ Error al crear carrito de compras 🛒❌\n ${e.message}`);
    }
  }

  /* Eliminar carrito de compras según ID */
  static async deleteChart(id) {
    try {
      const fs = require('fs');

      // Lectura de carritos existentes.
      let chartArray = await readFileShoppingCharts();
      
      let finded = chartArray.some(c => c.id === id);

      if (finded) {
        chartArray = chartArray.filter(c => c.id !== id);

        // Se almacenan modificaciones en archivo
        await fs.promises.writeFile('./config/json/shoppingCharts.json', JSON.stringify(chartArray, null, 2));
        console.log('🛒 Carrito de compras eliminado 🛒');
      }
      else {
        console.log('🛒❌ Carrito de compras no encontrado ❌🛒');
      }

      return finded;
    }
    catch (e) {
      console.log(`🛒❌ Error al eliminar carrito de compras 🛒❌\n ${e.message}`);
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