import { createAction } from 'redux-actions';

export const message = createAction('MESSAGE');

export const increment = createAction('INCREMENT');

export const checkedLogin = (fbSDK) => ({
  type: 'CHECKED_LOGIN',
  fbSDK,
});
