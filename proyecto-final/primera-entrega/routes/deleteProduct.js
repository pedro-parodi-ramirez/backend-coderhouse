const express = require('express');
const router = express.Router();
const STATUS = require('../config/variables');
const DB = require('../config/DB');

/* Eliminar producto según ID */
router.delete('/api/productos/:id', async function (req, res, next) {
    try {
        console.log('Solicitud DELETE para eliminar producto');
        let id = parseInt(req.params.id);
        let accepted = await DB.deleteProduct(id);
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