// import { takeLatest, delay } from "redux-saga/effects";

// export function* onIncrement() {
//   yield console.log("I am incremented");
//   yield delay(5000);
//   yield console.log("I am finished");
// }

// export function* incrementSaga() {
//   // If you dispatch "INCREMENT" action
//   // several times Saga cancels all generator
//   // functions except the last one
//   yield takeLatest("INCREMENT", onIncrement);
// }

// function* createSquareNumbersGenerator(max) {
//   let n = 0;

//   while (n < max) {
//     n++;
//     yield n * n;
//   }
// }

// for (const n of createSquareNumbersGenerator(10)) {
//   console.log(n);
// }
