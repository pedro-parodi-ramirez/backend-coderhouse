import { Router } from 'express';
import { STATUS } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();

/* Obtener todos los productos. */
router.get('/api/productos', async function (_, res, next) {
  try {
    console.log('\nSolicitud GET de listar los productos');
    const products = await productAPI.getAllProducts();

    res.status(STATUS.OK).json(products);
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

/* Obtener producto según ID */
router.get('/api/productos/:id', async function (req, res, next) {
  try {
    let id = parseInt(req.params.id);
    console.log(`\nSolicitud GET para buscar producto id:${id}`);
    const productRequested = await ProductDaoMongoDB.getProductById(id);
    if (productRequested !== null) {
      res.status(STATUS.OK).json(productRequested);
    }
    else {
      let message = {
        error: -2,
        route: 'localhost:8080/api/productos/:id',
        method: 'GET',
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

export default router;