import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import FacebookSDK from '../../util/FacebookSDK';

const initialState = fromJS({
  token: null,
  connected: false,
});

const reducer = handleActions({
  SIGNIN_SUCCESS: (state, action) => (
    state.withMutations(s => {
      s.set('token', action.token);
      s.set('userID', action.userID);
      s.set('connected', true);
    })
  ),
  SIGNIN_REJECT: (state) => (
    state.set('connected', false)
  ),
}, initialState)

export default reducer;

