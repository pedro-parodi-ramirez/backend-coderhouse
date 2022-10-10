const express = require('express');
const router = express.Router();
const STATUS = require('../config/variables');
const DB = require('../config/DB');

/* Actualizar producto según ID */
router.put('/api/productos/:id', async function (req, res, next) {
    try {
        console.log('Solicitud UPDATE para modificar producto');
        let id = parseInt(req.params.id);
        let accepted = await DB.updateProduct(id, req.body);
        if(accepted){
            res.status(STATUS.ACCEPTED).redirect('/');
        }
        else{
            res.status(STATUS.BAD_REQUEST).redirect('/');
        }
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;