import { Router } from 'express';
import { variables } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;

/* Get all products. */
router.get('/api/productos', async function (_, res) {
  try {
    console.log('\nGET request to show all products');
    const products = await productAPI.getAll();
    
    (products.length >= 0) && console.log('📁✔ Read products from DB ✔📁');

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
    console.log(`\nGET request to search product id:${id}`);
    const productRequested = await productAPI.getById(id);
    
    if (productRequested.length > 0) {
      console.log('📁✔ Read product from DB ✔📁');
      res.status(STATUS.OK).json(productRequested);
    }
    else {
      console.log('📁❌ Product not found ❌📁');
      res.status(STATUS.BAD_REQUEST).json([]);
    }
  }
  catch (e) {
    console.log(e.message);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json([]);
  }
});

export default router;