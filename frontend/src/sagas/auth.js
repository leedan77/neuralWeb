import { takeEvery, delay } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from '../api';
import { signinSuccess, signinReject } from '../containers/LoginPage/action';

function* checkedLogin({ fbSDK }) {
  const res = yield call([fbSDK, fbSDK.getLoginStatus]);
  if (res.status === 'connected') {
    yield put(signinSuccess(res.authResponse.accessToken, res.authResponse.userID));
    yield put(push('/select'));
  } else {
    yield put(signinReject());
    yield put(push('/'));
  }
}

function* logout() {
  
}

export default function* auth() {
  yield [
    takeEvery('CHECKED_LOGIN', checkedLogin),
    takeEvery('LOGOUT', logout)
  ];
}
