import { h } from 'preact';
import { useEffect } from 'preact/hooks';

const signInButton = (onSignIn: (argument: GoogleUser) => void) =>
  window.gapi.signin2.render('lock-screen', {
    scope: 'email openid',
    width: 400,
    height: 100,
    longtitle: true,
    theme: 'dark',
    onsuccess: onSignIn,
  });

const SignIn = ({
  onSignIn,
}: {
  onSignIn: (googleUser: GoogleUser) => void;
}) => {
  useEffect(() => {
    const appendSignIn = () => {
      const lockScreen = document.createElement('div');
      lockScreen.setAttribute('id', 'lock-screen');
      document.querySelector('#app')?.append(lockScreen);
      if (window.gapi) {
        signInButton(onSignIn);
      } else {
        const checkWindow = setInterval(() => {
          if (window.gapi) {
            signInButton(onSignIn);
            clearInterval(checkWindow);
          }
        }, 100);
      }
    };
    appendSignIn();
  });
  return <div id="lock" />;
};

export default SignIn;
