import { Router } from 'express';
import { logError } from '../../logs/logger.js';

const router = Router();

/* GET random numbers. */
router.get('/randoms', function (req, res, next) {
  try {
    const qty = req.query.qty;
    let numbers = {};
    console.log(`Solicitud de generar ${qty} números aleatorios`);

    if (qty) { generateRandomArray(qty, numbers); }
    else { generateRandomArray(10, numbers); }

    const data = {
      url: req.protocol + '://' + req.get('host') + req.originalUrl,
      numbers
    }
    res.end(JSON.stringify(data, null, 3));
  }
  catch (e) {
    logError(req, res, next);
  }
});

function generateRandomArray(qty, numbers) {
  let number;
  for (let i = 0; i < qty; i++) {
    number = Math.floor((Math.random() * 1000) + 1);
    if (number.toString() in numbers) {
      numbers[`${number}`]++;
    }
    else { numbers[`${number}`] = 1 }
  }
}

export default router;