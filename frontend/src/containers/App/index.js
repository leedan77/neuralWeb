import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
/* eslint-disable no-unused-vars */
import FacebookSDK from '../../util/FacebookSDK';
import style from './style.css';


const App = ({ message, children }) => (
  <div>
    <IndexLink to="/" className={style.link} activeClassName={style.active}>Home</IndexLink>
    <Link to="drop" className={style.link} activeClassName={style.active}>Drop</Link>
    <Link to="select" className={style.link} activeClassName={style.active}>Select</Link>
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

