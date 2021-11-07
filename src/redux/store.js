// store.js
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";

import rootReducer from "./root-reducer";

// You can pass configuration object
// to createSagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Inside run we can pass each individual saga
sagaMiddleware.run(rootSaga);

// This creates 'persisted' version of our Store
export const persistor = persistStore(store);
