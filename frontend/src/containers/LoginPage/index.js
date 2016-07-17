import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import style from './style.scss';
import FacebookBtn from '../../Components/FacebookBtn';
import FacebookSDK from '../../util/FacebookSDK';
import { signinSuccess, signinReject } from './action';
import request from 'superagent';
// import img from '../../../assets/images/welcomePage.jpg';

function handleLogin(e, dispatch) {
  e.preventDefault();
  FacebookSDK.login((res) => {
    console.log(res);
    if (res.status === 'connected') {
      dispatch(signinSuccess(res.authResponse.accessToken));
    } else {
      dispatch(signinReject());
    }
  });
}

function handlePhotos(e) {
  e.preventDefault();
  FacebookSDK.getAllImages()
  .then((result) => {
    console.log(result);
    const file = result[0].data[0].images[2].source;
    const id = result[0].data[0].id;
    const req = request.post('http://localhost:3000/upload');
    req.send({
      photoUrl: file,
      id,
    });
    req.end((err, res) => {
      if (err) console.log(err);
      console.log(res);
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

const LoginPage = ({ dispatch }) => (
  <div className={style.loginHero}>
    <div className={style.loginForm}>
      <FacebookBtn className={style.fbBtn} onClick={(e) => handleLogin(e)}>
        facebook 登入
      </FacebookBtn>
      <FacebookBtn className={style.fbBtn} onClick={(e) => handlePhotos(e, dispatch)}>
        分析您的照片
      </FacebookBtn>
      <div className={style.sepLine}>或</div>
      <button className={style.tryBtn}><Link className={style.link} to="page">
        Page搶先體驗我們的服務
      </Link></button>
    </div>
  </div>
);

LoginPage.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(LoginPage);

