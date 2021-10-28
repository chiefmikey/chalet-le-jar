import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import launchClient from '../libs/ec2Client';

const onSignIn = (googleUser) => {
  const { id_token } = googleUser.getAuthResponse();
  document.getElementById('sign-in-button').style.display = 'none';
  document.getElementById('lock-screen').style.display = 'none';
  launchClient(id_token);
  console.log('weeeeee');
};

const User = () => {
  useEffect(() => {
    if (window.gapi) {
      window.gapi.signin2.render('g-signin2', {
        scope: 'https://www.googleapis.com/auth/plus.login',
        width: 200,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: onSignIn,
      });
    }
  });
};

export default User;
