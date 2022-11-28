import { Router } from 'express';
import dbFaker from '../../db/faker.js';
import { emit } from '../../socket.js';
import { auth } from '../session/login.js';

const router = Router();

/* GET add product */
router.get('/api/productos-test', auth, async function (req, res, next) {
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