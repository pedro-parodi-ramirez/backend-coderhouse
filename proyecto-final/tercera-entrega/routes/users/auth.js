import { Router } from 'express';
import passport from 'passport';
import { variables } from '../../config/config.js';

const STATUS = variables.STATUS;

const router = Router();

router.post('/sign-in', passport.authenticate('sign-in'), (req, res) => {
  try {
    const { user } = req;
    if (!req.isAuthenticated()) {
      res.status(STATUS.UNAUTHORIZED).json({ message: 'Invalid email or password' });
      return;
    }
    res.status(STATUS.ACCEPTED).json({ message: `Bienvenid@ ${user.name} !` });
  }
  catch (e) {
    console.log("Error in sign-in:\n" + e);
  }
});

router.post('/sign-up', passport.authenticate('sign-up'), (req, res) => {
  const { user } = req;
  res.status(STATUS.ACCEPTED).json({ message: `Bienvenid@ ${user.name} !` });
})

router.post('/sign-out', (req, res, next) => {
  const { user } = req;
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.status(STATUS.ACCEPTED).json({ message: `Hasta luego ${user.name} ! 👋` })
  })
})

export default router;