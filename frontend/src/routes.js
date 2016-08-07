/* eslint-disable global-require */
import LoginPage from './containers/LoginPage';

function loadModule(callback) {
  return (componentModule) => {
    callback(null, componentModule.default);
  };
}

function getRoute(store) {
  const isLogin = () => (
    store.getState().login.connected
  );
  return [{
    path: '/',
    indexRoute: {
      component: LoginPage,
    },
    onEnter(nextState, replace) {
      if (isLogin()) {
        replace({
          pathname: '/select',
        });
      }
    },
  }, {
    path: '/drop',
    getComponent(nextState, callback) {
      require(['./containers/DropPage'], loadModule(callback));
    },
  }, {
    path: '/select',
    onEnter(nextState, replace) {
      if (!isLogin()) {
        replace({
          pathname: '/',
        });
      }
    },
    getComponent(nextState, callback) {
      require(['./containers/SelectPage'], loadModule(callback));
    },
  }];
}

export default getRoute;

