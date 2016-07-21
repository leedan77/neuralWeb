import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
    /*
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
    */
  })
  .catch((err) => {
    // throw (err);
    dispatch(getPhotoFail(err));
  });
}

class SelectPage extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    photos: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { photos } = this.props;
    console.log(photos);
    return (
      <div>
        <FacebookBtn className={style.fbBtn} onClick={(e) => handlePhotos(e, this.props.dispatch)}>
          選取您 facebook 的照片
        </FacebookBtn>
        <button className={style.tryBtn}><Link className={style.link} to="drop">
          上傳自己的照片
        </Link></button>
        
        {(photos.tagged != null) ?
          <ul>{photos.tagged.data.map((photo, i) =>
            <li key={i}>
              <img src={photo.images[0].source} alt={photo.id} />
            </li>
        )}</ul> : null}

        {(photos.uploaded != null) ?
          <ul>{photos.uploaded.data.map((photo, i) =>
            <li key={i}>
              <img src={photo.images[0].source} alt={photo.id} />
            </li>
        )}</ul> : null}
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  photos: {
    tagged: (state.select.get('tagged') == null) ? null : state.select.get('tagged').toJS(),
    uploaded: (state.select.get('uploaded') == null) ? null : state.select.get('uploaded').toJS(),
  },
});


export default connect(mapStateToProp)(SelectPage);
