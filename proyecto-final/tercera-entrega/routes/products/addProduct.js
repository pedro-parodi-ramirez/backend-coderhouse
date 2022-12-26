import { Router } from 'express';
import { variables } from '../../config/config.js';
import { productDAO as productAPI } from '../../daos/index.js';

const router = Router();
const STATUS = variables.STATUS;
const ADMIN = variables.ADMIN;

/* Add new product */
router.post('/api/productos', async function (req, res) {
  try {
    if (ADMIN) {
      console.log('\nPOST request to add new product to the database');
      const product = {
        timestamp: Date.now(),
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        image: req.body.image,
        price: parseFloat(parseFloat(req.body.price).toFixed(2)),
        stock: parseInt(req.body.stock)
      }

      const response = await productAPI.create(product);
      console.log('📁✔ Added product to DB ✔📁');
      res.status(STATUS.ACCEPTED).json(response);
    }
    else {
      let message = {
        error: -1,
        route: 'localhost:8080/api/productos',
        method: 'POST',
        status: 'Uauthorized'
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