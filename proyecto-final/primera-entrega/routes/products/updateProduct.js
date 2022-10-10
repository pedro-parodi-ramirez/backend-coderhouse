const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const { ADMIN } = require('../../config/variables');
const DB = require('../../config/DB');

/* Actualizar producto según ID */
router.put('/api/productos/:id', async function (req, res, next) {
    try {
        if (ADMIN) {
            let id = parseInt(req.params.id);
            console.log(`\nSolicitud UPDATE para modificar producto id:${id}`);
            let accepted = await DB.updateProduct(id, req.body);
            if (accepted) {
                res.status(STATUS.ACCEPTED).redirect('/');
            }
            else {
                res.status(STATUS.BAD_REQUEST).redirect('/');
            }
        }
        else {
            let message = {
                error: -1,
                route: 'localhost:8080/api/productos/:id',
                method: 'UPDATE',
                status: 'No autorizado'
            }
            res.status(STATUS.UNAUTHORIZED).json(message);
        }
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;