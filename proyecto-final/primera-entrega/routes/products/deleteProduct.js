const express = require('express');
const router = express.Router();
const { STATUS } = require('../../config/variables');
const { ADMIN } = require('../../config/variables');
const DB = require('../../config/DB');

/* Eliminar producto según ID */
router.delete('/api/productos/:id', async function (req, res, next) {
    try {
        if (ADMIN) {
            let id = parseInt(req.params.id);
            console.log(`\nSolicitud DELETE para eliminar producto id:${id}`);
            let accepted = await DB.deleteProduct(id);
            if (accepted) {
                res.status(STATUS.ACCEPTED).end();
            }
            else {
                res.status(STATUS.BAD_REQUEST).end();
            }
        }
        else {
            let message = {
                error: -1,
                route: 'localhost:8080/api/productos/:id',
                method: 'DELETE',
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