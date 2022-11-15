import { Router } from 'express';
import DB from '../db/db.js';
import { emit } from '../socket.js';
import { auth } from './login.js';

const router = Router();

/* POST add product */
router.post('/api/productos', auth, async function (req, res, next) {
  try {
    const data = req.body;
    console.log('Solicitud POST para agregar producto');
    await DB.addProduct(data);
    emit('new-product', data);
    res.redirect('/');
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
})

export default router;