import { Router } from 'express';
import { STATUS } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();

/* Obtener todos los productos. */
router.get('/api/productos', async function (_, res) {
  try {
    console.log('\nSolicitud GET de listar los productos');
    const products = await productAPI.getAll();

    (products.length >= 0) && console.log('📁✔ Lectura de productos en DB ✔📁');

    res.status(STATUS.OK).json(products);
  }
  catch (e) {
    console.log(e.message);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
});

/* Obtener producto según ID */
router.get('/api/productos/:id', async function (req, res) {
  try {
    let id = req.params.id;
    console.log(`\nSolicitud GET para buscar producto id:${id}`);
    const productRequested = await productAPI.getById(id);

    if (productRequested.length !== 0) {
      console.log('📁✔ Lectura de producto en DB ✔📁');
      res.status(STATUS.OK).json(productRequested);
    }
    else {
      console.log('📁❌ Producto no encontrado ❌📁');
      res.status(STATUS.BAD_REQUEST).json([]);
    }
  }
  catch (e) {
    console.log(e.message);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
});

export default router;