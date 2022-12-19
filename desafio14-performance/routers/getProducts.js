import { Router } from 'express';
import DB from '../db/db.js';
import dbFaker from '../db/faker.js';
import { emit } from '../socket.js';
import { logError } from '../logs/logger.js';

const router = Router();

/* GET products. */
router.get('/productos', async function (req, res, next) {
  try {
    console.log('Solicitud GET de listar los productos');
    const data = await DB.getProducts();
    
    res.json(data);
  }
  catch (e) {
    logError(req, res, next);
  }
});

/* FAKER - GET add product */
router.get('/api/productos-test', async function (_, res, next) {
  try {
    console.log('Solicitud GET para generar vista con Faker');
    const data = await dbFaker.getView();
    emit('new-product', data);
    res.json(data);
  }
  catch (e) {
    logError(req, res, next);
    next(e);
  }
})

export default router;