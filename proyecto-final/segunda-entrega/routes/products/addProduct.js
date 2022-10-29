import { Router } from 'express';
import { STATUS, ADMIN } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();

/* Agregar nuevo producto */
router.post('/api/productos', async function (req, res, next) {
  try {
    if (ADMIN) {
      console.log('\nSolicitud POST para agregar producto');
      await productAPI.addProduct(req.body);
      res.status(STATUS.ACCEPTED).end();
    }
    else {
      let message = {
        error: -1,
        route: 'localhost:8080/api/productos',
        method: 'POST',
        status: 'No autorizado'
      }
      res.status(STATUS.UNAUTHORIZED).json(message);
    }
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
})

export default router;