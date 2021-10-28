import { h } from 'preact';

const signOutUser = () => {
  window.gapi.load('auth2', () => {
    window.gapi.auth2.init();
  });
  if (window.gapi && window.gapi.auth2) {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2
      .signOut()
      .then(() => {
        console.log('User signed out');
        document.getElementsByClassName('g-signin2').style.display = 'visible';
        document.getElementById('lock-screen').style.display = 'visible';
      })
      .catch((e) => console.log('Sign out user error', e));
  }
};

const SignOut = () => (
  <button id="sign-out" onClick={signOutUser}>
    Sign out
  </button>
);

export default SignOut;
