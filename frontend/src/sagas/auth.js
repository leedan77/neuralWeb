import { takeEvery, delay } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from '../api';
import { signinSuccess, signinReject } from '../containers/LoginPage/action';



function* checkedLogin({ fbSDK }) {
  
  //const res = yield call(fbSDK.getLoginStatus);
  /*if (res.status === 'connected') {
    yield put(signinSuccess);
    yield put(push('/select'));
  } else {
    yield put(signinReject);
    yield put(push('/'));
  }*/
}

export default function* auth() {
  yield [
    takeEvery('CHECKED_LOGIN', checkedLogin),
  ];
}
