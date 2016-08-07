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
    this.photoFields = {
      fields: 'place, images',
    };
  }

  init() {
    // Insert #fb-root to the body if not exist
    if (!document.getElementById('fb-root')) {
      const root = document.createElement('div');
      root.id = 'fb-root';
      document.body.insertBefore(root, document.body.childNodes[0]);
    }

    (function asynLoad(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Run after Facebook SDK is ready
    return new Promise((resolve) => {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: APP_ID,
          xfbml: true,
          version: SDK_VERSION,
        });
        this.FB = window.FB;
        resolve();
      };
    });
  }

  login(callback) {
    this.FB.login(callback, {
      scope: REQUIRED_SCOPES,
    });
  }

  getLoginStatus() {
    return this.init()
    .then(() => (
      new Promise((resolve) => {
        this.FB.getLoginStatus((res) => {
          resolve(res);
        });
      })
    ));
  }

  getTaggedPhotos() {
    return new Promise((resolve, reject) => {
      this.FB.api('/me/photos', this.photoFields, (res) => {
        if (res.data !== undefined) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }

  getUploadedPhotos() {
    return new Promise((resolve, reject) => {
      this.FB.api('/me/photos?type=uploaded', this.photoFields, (res) => {
        if (res.data !== undefined) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }

  getAllImages() {
    return Promise.all([this.getTaggedPhotos(), this.getUploadedPhotos()]);
  }
}

export default new FacebookSDK();
