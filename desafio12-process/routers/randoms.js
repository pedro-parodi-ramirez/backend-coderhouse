import { Router } from 'express';

const router = Router();
const numbers = {};

/* GET random numbers. */
router.get('/randoms', function (req, res, next) {
  try {
    const qty = req.query.qty;
    if (qty) { generateRandomArray(qty) }
    else { generateRandomArray(10) }

    res.json(numbers);
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

export default router;

function generateRandomArray(qty) {
  let number;
  for (let i = 0; i < qty; i++) {
    number = Math.floor((Math.random() * 1000) + 1);
    if (number.toString() in numbers) {
      numbers[`${number}`]++;
    }
    else { numbers[`${number}`] = 1 }
  }
}