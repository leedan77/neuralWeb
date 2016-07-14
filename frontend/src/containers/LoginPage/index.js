import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './style.scss';
import FacebookBtn from '../../Components/FacebookBtn';
import FacebookSDK from '../../util/FacebookSDK';
import { signinSuccess, signinReject } from './action';

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

const LoginPage = ({ dispatch }) => (
  <div>
    <FacebookBtn className={style.fbBtn} onClick={(e) => handleLogin(e, dispatch)}>
      facebook 登入
    </FacebookBtn>
  </div>
);

LoginPage.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(LoginPage);

