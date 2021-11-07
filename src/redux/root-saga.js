// root-saga.js
import { all, call } from "redux-saga/effects";

import { shopSagas } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";

export default function* rootSaga() {
  // We can call any number of sagas inside of
  // this array and initialize them all on
  // separate tasks streams
  yield all([call(shopSagas), call(userSagas), call(cartSagas)]);
}
