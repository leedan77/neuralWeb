import { delay } from 'redux-saga';
import { fork, put } from 'redux-saga/effects';
import { increment } from '../containers/App/actions';
import authSaga from './auth';

export default function* rootSaga() {
  yield fork(authSaga);
}
