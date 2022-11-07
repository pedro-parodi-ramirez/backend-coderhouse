import { Router } from 'express';
import DB from '../db/DB.js';
import { emit } from '../socket.js';

const router = Router();

/* POST add product */
router.post('/api/productos', async function (req, res, next) {
  try {
    const data = req.body;
    console.log('Solicitud POST para agregar producto');
    await DB.addProduct(data);
    console.log('[SUCCESS]');
    emit('new-product', data);
    res.redirect('/');
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
})

export default router;