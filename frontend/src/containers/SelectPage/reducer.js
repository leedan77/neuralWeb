import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({
  tagged: null,
  uploaded: null,
});

const reducer = handleActions({
  GET_PHOTO_SUCCESS: (state, action) => {
    return state.withMutations(s => {
      s.set('tagged', fromJS(action.payload[0]));
      s.set('uploaded', fromJS(action.payload[1]));
    });
  },
  GET_PHOTO_FAIL: (state, action) => {
    return state.withMutations(s => {
      s.set('tagged', fromJS(action.payload));
      s.set('uploaded', fromJS(action.payload));
    });
  },
}, initialState);

export default reducer;

