import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FacebookBtn from '../../Components/FacebookBtn';
import PhotoCollection from './PhotoCollection';
import FacebookSDK from '../../util/FacebookSDK';
import style from './style.scss';
import { getPhotoSuccess, getPhotoFail, selectPhoto, submitPhoto } from './action';
import request from 'superagent';

function handlePhotos(e, dispatch) {
  e.preventDefault();
  FacebookSDK.getAllImages()
  .then((result) => {
    dispatch(getPhotoSuccess(result));
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
  handleClick = (dispatch) => (
    (id, url, category) => {
      dispatch(selectPhoto(id, url, category));
    }
  )
  handleSubmit = () => {
    this.props.dispatch(submitPhoto());
    const selected = this.props.photos.selected;
    const req = request.post('http://localhost:3000/upload');
    req.send(selected);
    req.end((err, res) => {
      if (err) {
        console.log(err);
      }
      // console.log(res);
    });
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
        <button className={style.submitBtn} onClick={this.handleSubmit}>送出選取的照片</button>
        <PhotoCollection photos={photos.tagged} category={"tagged"} handleClick={this.handleClick(this.props.dispatch)} />
        <PhotoCollection photos={photos.uploaded} category={"uploaded"} handleClick={this.handleClick(this.props.dispatch)} />
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  photos: state.select.toJS()
});


export default connect(mapStateToProp)(SelectPage);
