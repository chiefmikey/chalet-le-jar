import { h } from 'preact';
import { useEffect } from 'preact/hooks';

const SignIn = ({ onSignIn }) => {
  useEffect(() => {
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen');
    document.getElementById('app').appendChild(lockScreen);
    if (window.gapi) {
      window.gapi.signin2.render('lock-screen', {
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

export default SignIn;
