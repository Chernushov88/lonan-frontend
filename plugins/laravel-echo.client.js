import Vue from 'vue';
import VueEcho from 'vue-echo-laravel';

export default function ({ app }) {
  window.Pusher = require('pusher-js');

  if (app.$auth.loggedIn) {
    const token = app.$auth.$storage._state['_token.password_grant'];
    installVuePlugin(token);
  } else {
    app.$auth.$storage.watchState('loggedIn', newValue => {
      if (newValue) {
        const token = app.$auth.$storage._state['_token.password_grant'];
        installVuePlugin(token);
      }
    })
  }

}


const installVuePlugin = (token) => {

  let config = {
    broadcaster: 'pusher',
    key: process.env.PUSHER_KEY,
    authEndpoint: process.env.API_URL + '/broadcasting/auth',
    cluster: 'eu',
    auth: {
      headers: {
        Authorization: token
      }
    }
  };

  Vue.use(VueEcho, config);
};
