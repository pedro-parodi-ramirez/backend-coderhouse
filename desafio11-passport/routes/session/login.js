import { Router } from 'express';

const router = Router();

const auth = (req, res, next) => {
  try {
    const { isAuth } = req.session;
    if (isAuth) {
      next();
    } else {
      console.log("🚫 Acceso denegado 🚫");
      res.status(403).send('Error: permission denied.')
    }
  }
  catch (e) {
    throw new Error(e);
  }
}

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

export { router, auth };