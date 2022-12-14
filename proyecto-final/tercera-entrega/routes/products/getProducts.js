import { Router } from 'express';
import { variables } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Get all products. */
router.get('/productos', async function (_, res) {
  try {
    console.log('\nGET request for all products');
    const products = await productAPI.getAll();
    
    (products.length >= 0) && console.log('πβ Read products βπ');

    res.status(STATUS.OK).json(products);
  }
  catch (e) {
    console.log(e.message);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
});

/* Obtener producto segΓΊn ID */
router.get('/productos/:id', async function (req, res) {
  try {
    let id = req.params.id;
    console.log(`\nGET request for product id:${id}`);
    const productRequested = await productAPI.getById(id);
    
    if (productRequested) {
      console.log('πβ Read product βπ');
      res.status(STATUS.OK).json(productRequested);
    }
    else {
      console.log('πβ Product not found βπ');
      res.status(STATUS.BAD_REQUEST).json([]);
    }
  }
  catch (e) {
    console.log(e.message);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
});

export default router;