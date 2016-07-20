import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './containers/App/reducer';
import logInReducer from './containers/LoginPage/reducer';
import selectReducer from './containers/SelectPage/reducer';

export default combineReducers({
  app: appReducer,
  login: logInReducer,
  select: selectReducer,
  routing: routerReducer,
});

