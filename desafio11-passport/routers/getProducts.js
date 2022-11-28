import { Router } from 'express';
import DB from '../db/db.js';
import dbFaker from '../db/faker.js';
import { emit } from '../socket.js';

const router = Router();

/* GET products. */
router.get('/api/productos', async function (_, res, next) {
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

/* FAKER - GET add product */
router.get('/api/productos-test', async function (_, res, next) {
  try {
      console.log('Solicitud GET para generar vista con Faker');
      const data = await dbFaker.getView();
      emit('new-product', data);
      res.json(data);
  }
  catch (e) {
      console.log(e.message);
      next(e);
  }
})

export default router;