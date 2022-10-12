const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const shoppingChartController = require('../../config/shoppingChartController');

/* Eliminar carrito según ID */
router.delete('/api/carrito/:id', async function (req, res, next) {
    try {
        let id = parseInt(req.params.id);
        console.log(`\nSolicitud DELETE eliminar carrito id:${id}`);       
        let accepted = await shoppingChartController.deleteChart(id);
        
        if(accepted){
            res.status(STATUS.ACCEPTED).end();
        }
        else{
            let message = {
                error: -2,
                route: 'localhost:8080/api/carrito/:id',
                method: 'DELETE',
                status: 'No implementado'
            }
            res.status(STATUS.NOT_FOUND).json(message);
        }
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;