import { h } from 'preact';

const signOutUser = () => {
  window.gapi.load('auth2', async () => {
    try {
      await window.gapi.auth2.init();
      const auth2 = await window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      console.log('User signed out');
    } catch (e) {
      console.log('Sign out user error', e);
    }
  });
};

const SignOut = ({ onLogout }) => (
  <button
    id="sign-out"
    onClick={() => {
      signOutUser();
      onLogout();
    }}
  >
    Sign out
  </button>
);

export default SignOut;
