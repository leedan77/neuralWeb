/* eslint-disable global-require */
function loadModule(callback) {
  return (componentModule) => {
    callback(null, componentModule.default);
  };
}

const routes = [{
  path: '/',
  getComponent(nextState, callback) {
    require(['./containers/LoginPage'], loadModule(callback));
  },
}, {
  path: '/drop',
  getComponent(nextState, callback) {
    require(['./containers/DropPage'], loadModule(callback));
  },
}, {
  path: '/select',
  getComponent(nextState, callback) {
    require(['./containers/SelectPage'], loadModule(callback));
  },
}];

export default routes;

