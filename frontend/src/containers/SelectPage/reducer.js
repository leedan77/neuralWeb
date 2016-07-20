import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({
  photos:
});

const reducer = handleActions({
  SIGNIN_SUCCESS: (state, action) => (
    state.withMutations(s => {
      s.set('token', fromJS(action.payload));
      s.set('connected', true);
    });
  ),
  SIGNIN_REJECT: (state, action) => (
    state.set('connected', false);
  ),
}, initialState);

export default reducer;

