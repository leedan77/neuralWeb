import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({
  tagged: null,
  uploaded: null,
  selected: [],
});

const reducer = handleActions({
  GET_PHOTO_SUCCESS: (state, action) => (
    state.withMutations(s => {
      s.set('tagged', fromJS(action.payload[0]));
      s.set('uploaded', fromJS(action.payload[1]));
    })
  ),
  GET_PHOTO_FAIL: (state, action) => (
    state.withMutations(s => {
      s.set('tagged', fromJS(action.payload));
      s.set('uploaded', fromJS(action.payload));
    })
  ),
  SELECT_PHOTO: (state, action) => {
    const s = state.getIn([action.category, 'data']);
    const idx = s.findIndex(photo => photo.get('id') === action.id);
    const selected = s.getIn([idx, 'selected']);
    const info = {
      id: action.id,
      photoUrl: action.url,
    };
    let newState;
    if (selected === false || selected === undefined) {
      newState = state.setIn([action.category, 'data', idx, 'selected'], true)
      .update('selected', arr => arr.push(fromJS(info)));
    } else {
      const selectedIdx = state.get('selected').findIndex(i => i.get('id') === action.id);
      newState = state.setIn([action.category, 'data', idx, 'selected'], false)
      .update('selected', arr => arr.delete(selectedIdx));
    }
    return newState;
  },
  SUBMIT_PHOTO: (state) => (
    state.withMutations(s => {
      s.updateIn(['tagged', 'data'], datas => datas.map(data => data.set('selected', false)));
      s.updateIn(['uploaded', 'data'], datas => datas.map(data => data.set('selected', false)));
      s.set('selected', new List());
    })
  ),
}, initialState);

export default reducer;

