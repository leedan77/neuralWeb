import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import style from './style.scss';
import FacebookBtn from '../../Components/FacebookBtn';
import FacebookSDK from '../../util/FacebookSDK';
import { signinSuccess, signinReject } from './action';

function handleLogin(e, dispatch) {
  e.preventDefault();
  FacebookSDK.login((res) => {
    if (res.status === 'connected') {
      dispatch(signinSuccess(res.authResponse.accessToken));
    } else {
      dispatch(signinReject());
    }
  });
}

const LoginPage = ({ dispatch }) => (
  <div className={style.loginHero}>
    <div className={style.loginForm}>
      <FacebookBtn className={style.fbBtn} onClick={(e) => handleLogin(e, dispatch)}>
        facebook 登入
      </FacebookBtn>
      <div className={style.sepLine}>或</div>
      <button className={style.tryBtn}><Link className={style.link} to="drop">
        搶先體驗我們的服務
      </Link></button>
    </div>
  </div>
);

LoginPage.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(LoginPage);

