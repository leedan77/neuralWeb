import React from 'react';
import FacebookBtn from '../../Components/FacebookBtn';
import FacebookSDK from '../../util/FacebookSDK';
import style from './style.scss';
import { getPhotoSuccess, getPhotoFail } from './action';
import request from 'superagent';

function handlePhotos(e, dispatch) {
  e.preventDefault();
  FacebookSDK.getAllImages()
  .then((result) => {
    console.log(result);
    const file = result[0].data[0].images[2].source;
    const id = result[0].data[0].id;
    dispatch(getPhotoSuccess(result));

    const req = request.post('http://localhost:3000/upload');
    req.send({
      photoUrl: file,
      id,
    });
    req.end((err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
  })
  .catch((err) => {
    console.log(err);
    dispatch(getPhotoFail(err));
  });
}

class SelectPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FacebookBtn className={style.fbBtn} onClick={(e) => handlePhotos(e)}>
        分析您的照片
      </FacebookBtn>
    );
  }

}

export default SelectPage;

