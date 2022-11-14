import { Router } from 'express';
import DB from '../db/db.js';

const router = Router();

/* GET products. */
router.get('/api/productos', async function (_, res, next) {
  try {
    console.log('Solicitud GET de listar los productos');
    const data = await DB.getProducts();

    res.json(data);
    console.log('[SUCCESS]');
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

export default router;