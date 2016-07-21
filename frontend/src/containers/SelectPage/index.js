import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FacebookBtn from '../../Components/FacebookBtn';
import PhotoCollection from './PhotoCollection';
import FacebookSDK from '../../util/FacebookSDK';
import style from './style.scss';
import { getPhotoSuccess, getPhotoFail } from './action';
import request from 'superagent';

function handlePhotos(e, dispatch) {
  e.preventDefault();
  FacebookSDK.getAllImages()
  .then((result) => {
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
      // console.log(res);
    });
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
  handleClick = (dispatch) => {
    return (id) => {
      console.log(id);
    };
    // dispatch(selectPhoto(id));
  }
  render() {
    const { photos } = this.props;
    return (
      <div>
        <FacebookBtn className={style.fbBtn} onClick={(e) => handlePhotos(e, this.props.dispatch)}>
          選取您 facebook 的照片
        </FacebookBtn>
        <button className={style.tryBtn}><Link className={style.link} to="drop">
          上傳自己的照片
        </Link></button>
        <PhotoCollection photos={photos.tagged} handleClick={this.handleClick(this.props.dispatch)} />
        <PhotoCollection photos={photos.uploaded} handleClick={this.handleClick(this.props.dispatch)} />
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
