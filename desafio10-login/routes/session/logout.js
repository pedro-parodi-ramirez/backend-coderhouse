import { Router } from 'express';
import { auth } from './login.js';

const router = Router();

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

export default router;