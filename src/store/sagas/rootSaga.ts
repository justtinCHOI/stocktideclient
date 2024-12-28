import { all } from 'redux-saga/effects';
import { watchLogin } from './memberSaga';
// import { watchCash } from './cashSaga';
// import { watchStock } from './stockSaga';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    // watchCash(),
    // watchStock(),
  ]);
}