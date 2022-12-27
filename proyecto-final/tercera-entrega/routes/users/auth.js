import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/sign-in', passport.authenticate('sign-in'), (req, res) => {
  try {
    const { user } = req;
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    res.json({ message: `Bienvenid@ ${user.name} !` });
  }
  catch (e) {
    console.log("Error al loguearse:\n" + e);
  }
});

router.post('/sign-up', passport.authenticate('sign-up'), (req, res) => {
  const { user } = req;
  res.json({ message: `Bienvenid@ ${user.name} !` });
})

router.post('/sign-out', (req, res, next) => {
  const { user } = req;
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.json({ message: `Hasta luego ${user.name} ! 👋` })
  })
})

export default router;