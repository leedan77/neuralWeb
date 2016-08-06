import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
/* eslint-disable no-unused-vars */
import FacebookSDK from '../../util/FacebookSDK';
import { checkedLogin } from './actions';
import style from './style.css';


class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const fb = new FacebookSDK();
    fb.getLoginStatus()
    .then((res) => {
      console.log(res);
    });
    dispatch(checkedLogin(fb));
  }
  render() {
    const { message, children } = this.props;
    return (
      <div className={style.main}>
        <div className={style.navbar}>
          <IndexLink to="/" className={style.link} activeClassName={style.active}>Home</IndexLink>
          <Link to="drop" className={style.link} activeClassName={style.active}>Drop</Link>
          <Link to="select" className={style.link} activeClassName={style.active}>Select</Link>
        </div>
        <div className={style.content}>
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => ({
  message: `${state.app.get('message')}, ${state.app.get('count')}`,
});

export { App };
export default connect(mapStateToProps)(App);

