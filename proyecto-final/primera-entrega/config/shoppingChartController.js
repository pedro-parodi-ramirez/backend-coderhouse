module.exports = class shoppingChartController {
    static nextID = 0;

    /* Crear nuevo carrito de compras */
    static async newShoppingChart() {
        try {
            const fs = require('fs');

            // Lectura de carritos existentes.
            const chartArray = await readFileShoppingCharts();
            shoppingChartController.nextID = chartArray.length;
            
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
            shoppingChartController.nextID++;
            return newChart.id;
        }
        catch (e) {
            console.log(`📂❌ Error al crear carrito de compras 📂❌\n ${e.mesage}`);
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
      console.log('📁❌ Error al leer la base de datos: ❌📁\n' + e.message);
      return [];
    }
  }