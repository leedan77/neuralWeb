import { createAction } from 'redux-actions';

export const signinSuccess = (token, userID) => ({
  type: 'SIGNIN_SUCCESS',
  token,
  userID,
});

export const signinReject = createAction('SIGNIN_REJECT');

export const logout = createAction('LOGOUT');

