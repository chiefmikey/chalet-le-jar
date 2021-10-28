import { h } from 'preact';

const signOutUser = () => {
  window.gapi.auth2
    .getAuthInstance()
    .signOut()
    .then(() => {
      console.log('User signed out');
    })
    .catch((e) => console.log('Sign out user error', e));
};

const SignOut = () => (
  <button id="sign-out" onClick={signOutUser}>
    Sign out
  </button>
);

export default SignOut;
