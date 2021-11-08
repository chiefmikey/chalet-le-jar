import { h } from 'preact';
import { useEffect } from 'preact/hooks';

const SignIn = ({ onSignIn }) => {
  useEffect(() => {
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen');
    document.getElementById('app').appendChild(lockScreen);
    if (window.gapi) {
      window.gapi.signin2.render('lock-screen', {
        scope: 'email openid',
        width: 400,
        height: 100,
        longtitle: true,
        theme: 'dark',
        onsuccess: onSignIn,
      });
    }
  });
};

export default SignIn;
