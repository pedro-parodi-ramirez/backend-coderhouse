import { Router } from 'express';
import { STATUS, ADMIN } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();

/* Agregar nuevo producto */
router.post('/api/productos', async function (req, res) {
  try {
    if (ADMIN) {
      console.log('\nSolicitud POST para agregar producto');

      const product = {
        timestamp: Date.now(),
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        image: req.body.image,
        price: parseFloat(parseFloat(req.body.price).toFixed(2)),
        stock: parseInt(req.body.stock)
      }

      await productAPI.add(product);
      console.log('📁✔ Producto agregado en DB ✔📁');
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
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(e.message);
  }
})

export default router;