const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const shoppingChartController = require('../../config/shoppingChartController');

/* Crear nuevo carrito */
router.delete('/api/carrito/:id', async function (req, res, next) {
    try {
        let id = parseInt(req.params.id);
        console.log(`\nSolicitud DELETE eliminar carrito id:${id}`);       
        let accepted = await shoppingChartController.deleteChart(id);
        
        if(accepted){
            res.status(STATUS.ACCEPTED).end();
        }
        else{
            res.status(STATUS.BAD_REQUEST).end();
        }
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;