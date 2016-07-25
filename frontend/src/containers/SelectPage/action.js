import { createAction } from 'redux-actions';

export const getPhotoSuccess = createAction('GET_PHOTO_SUCCESS');

export const getPhotoFail = createAction('GET_PHOTO_FAIL');

export const selectPhoto = (id, url, category) => ({
  type: 'SELECT_PHOTO',
  id,
  url,
  category,
});

export const submitPhoto = createAction('SUBMIT_PHOTO');
