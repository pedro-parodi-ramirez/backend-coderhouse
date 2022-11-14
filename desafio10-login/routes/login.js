import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
    try {
        const username = req.body;
        req.session.username = username;
        req.session.isAuth = true;
        res.status(200).json(username);
    }
    catch (e) {
        console.log("Error al loguearse:\n" + e);
    }
});

export default router;