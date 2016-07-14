import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
/* eslint-disable no-unused-vars */
import FacebookSDK from '../../util/FacebookSDK';
import style from './style.css';
import DropzoneDemo from '../Dropzone';

const App = ({ message, children }) => (
  <div>
    <div className={style.appTitle}>App</div>
    <div className={style.appMessage}>{message}</div>
    <IndexLink to="/" activeClassName={style.active}>Home</IndexLink>
    <Link to="page" activeClassName={style.active}>Page</Link>
    <DropzoneDemo />
    {children}
  </div>
);

App.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
  message: `${state.app.get('message')}, ${state.app.get('count')}`,
});

export { App };
export default connect(mapStateToProps)(App);

