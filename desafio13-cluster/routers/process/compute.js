// let qty;
// let numbers = {};

// process.on("message", query => {
//     if (query) { generateRandomArray(query); }
//     else { generateRandomArray(10); }
//     process.send(numbers);
//     process.exit();
// });

// function generateRandomArray(qty) {
//     let number;
//     for (let i = 0; i < qty; i++) {
//         number = Math.floor((Math.random() * 1000) + 1);
//         if (number.toString() in numbers) {
//             numbers[`${number}`]++;
//         }
//         else { numbers[`${number}`] = 1 }
//     }
// }

// process.send('ready');