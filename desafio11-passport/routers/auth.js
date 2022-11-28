import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/sign-in', passport.authenticate('login'), (req, res) => {
  try {
    const { user } = req
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: 'Email or password is invalid' })
      return
    }
    res.json({ message: `Bienvenid@ ${user.email} !` })
  }
  catch (e) {
    console.log("Error al loguearse:\n" + e);
  }
});

router.post('/sign-up', passport.authenticate('register'), (req, res) => {
  const { user } = req
  console.log('register -> user', user);
  res.json({ message: `Bienvenid@ ${user.email} !` })
})

router.post('sign-out', (req, res, next) => {
  const { user } = req
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.json({ message: `Goodbye ${user.email}.` })
  })
})

export default router;