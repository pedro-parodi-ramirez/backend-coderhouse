import { Router } from 'express';
import { fork } from 'child_process';

const router = Router();

/* GET random numbers. */
router.get('/randoms', function (req, res, next) {
  try {
    const qty = req.query.qty;
    console.log(`Solicitud de generar ${qty} números aleatorios`);

    const child = fork('./routers/process/compute.js');
    child.on('message', msg => {
      if (msg === 'ready') {
        child.send(qty);
        return;
      }
      res.json(msg);
    })
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

export default router;