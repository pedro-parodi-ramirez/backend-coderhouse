import { Router } from 'express';
// import { fork } from 'child_process';

const router = Router();
let numbers = {};

/* GET random numbers. */
router.get('/randoms', function (req, res, next) {
  try {
    const qty = req.query.qty;
    console.log(`Solicitud de generar ${qty} números aleatorios`);

    // const child = fork('./routers/process/compute.js');
    // child.on('message', msg => {
    //   if (msg === 'ready') {
    //     child.send(qty);
    //     return;
    //   }
    //   res.end(JSON.stringify(msg, null, 3));
    // })

    generateRandomArray(qty);
    res.end(JSON.stringify(numbers, null, 3));
  }
  catch (e) {
    console.log(e.message);
    next(e);
  }
});

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

export default router;