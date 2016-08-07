import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './Root';
import configureStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';

// const store = configureStore(browserHistory);
configureStore(browserHistory)
.then(store => {
  const history = syncHistoryWithStore(browserHistory, store);

  injectTapEventPlugin();
  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  );
  if (module.hot) {
    module.hot.accept('./Root', () => {
      const NextRoot = require('./Root').default; // eslint-disable-line global-require
      render(
        <NextRoot store={store} history={history} />,
        document.getElementById('root')
      );
    });
  }
});
