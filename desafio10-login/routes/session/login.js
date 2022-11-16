import { Router } from 'express';

const router = Router();

// Middleware para corroborar sesión activa
const auth = (req, res, next) => {
  try {
    const { isAuth } = req.session;
    if (isAuth) {
      next();
    } else {
      console.log("🚫 Acceso denegado 🚫");
      res.status(403).json('Error: permission denied.');
    }
  }
  catch (e) {
    throw new Error(e);
  }
}

// Corrobora si hay sesión activa
router.get('/login', auth, (req, res) => {
  try {
    res.status(200).json({ username: req.session.username });
  }
  catch (e) {
    throw new Error(e);
  }
});

// Crea una nueva sesión
router.post('/login', (req, res) => {
  try {
    const { username } = req.body;
    req.session.username = username;
    req.session.isAuth = true;
    res.status(200).json({ username });
  }
  catch (e) {
    throw new Error(e);
  }
});

// Destruye sesióna ctual
router.delete('/logout', auth, (req, res) => {
  try {
    req.session.destroy(error => {
      if (!error) {
        res.status(202).end();
      } else {
        res.status(500).json('Ah ocurrido un error.')
      }
    });
  }
  catch (e) {
    throw new Error(e);
  }
})

export { router, auth };