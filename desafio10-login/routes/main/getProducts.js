import { Router } from 'express';
import DB from '../../db/db.js';
import { auth } from '../session/login.js';

const router = Router();

/* GET products. */
router.get('/api/productos', auth, async function (_, res, next) {
  try {
    console.log('Solicitud GET de listar los productos');
    const data = await DB.getProducts();
    res.json(data);
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

export default router;