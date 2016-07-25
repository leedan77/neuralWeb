import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import App from './containers/App';
import DevTools from './DevTools';
import '../assets/css/base.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const rootRoute = {
  component: App,
  childRoutes: routes,
};

const renderDevTools = () => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return <DevTools />;
};

const Root = ({ store, history }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <Router history={history} routes={rootRoute} />
        {renderDevTools()}
      </div>
    </MuiThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
};

export default Root;

