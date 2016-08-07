import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
/* eslint-disable no-unused-vars */
import FacebookSDK from '../../util/FacebookSDK';
import { checkedLogin } from './actions';
import style from './style.css';
import cx from 'classnames';

class App extends React.Component {
  renderButton() {
    const { connected } = this.props;
    if (connected) {
      return (
        <button className={style.link} onClick={this.handleClick}>登出</button>
      )
    } else {
      return (
        <button className={style.link} onClick={this.handleClick}>登入</button>
      )
    } 
  }
  render() {
    const { message, children } = this.props;
    return (
      <div className={style.main}>
        <div className={style.navbar}>
          <IndexLink to="/" className={style.link} activeClassName={style.active}>Home</IndexLink>
          <Link to="drop" className={style.link} activeClassName={style.active}>Drop</Link>
          <Link to="select" className={style.link} activeClassName={style.active}>Select</Link>
          {this.renderButton()}
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
  connected: state.login.connected,
});

export { App };
export default connect(mapStateToProps)(App);

