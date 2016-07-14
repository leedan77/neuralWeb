const APP_ID = '731555140319620';
const SDK_VERSION = 'v2.6';
const REQUIRED_SCOPES = [
  'public_profile',
  'email',
  'user_photos',
].join(',');

class FacebookSDK {
  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    // Insert #fb-root to the body if not exist
    if (!document.getElementById('fb-root')) {
      const root = document.createElement('div');
      root.id = 'fb-root';
      document.body.insertBefore(root, document.body.childNodes[0]);
    }

    // Run after Facebook SDK is ready
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: APP_ID,
        xfbml: true,
        version: SDK_VERSION,
      });
      this.FB = window.FB;
    };

    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  login(callback) {
    this.FB.login(callback, {
      scope: REQUIRED_SCOPES,
    });
  }
}

export default new FacebookSDK();
