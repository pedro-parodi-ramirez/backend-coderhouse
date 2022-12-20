import { Router } from 'express';
import DB from '../db/db.js';
import { emit } from '../socket.js';
import { logError } from '../logs/logger.js';

const router = Router();

/* POST add product */
router.post('/productos', async function (req, res, next) {
  try {
    const data = req.body;
    console.log('Solicitud POST para agregar producto');
    await DB.addProduct(data);
    emit('new-product', data);
    res.redirect('/');
  }
  catch (e) {
    logError(req, res, next);
    console.log(e.message);
  }
})

export default router;