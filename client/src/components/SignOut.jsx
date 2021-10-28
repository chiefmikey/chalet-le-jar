import { h } from 'preact';

const signOutUser = () => {
  window.gapi.load('auth2', async () => {
    try {
      await window.gapi.auth2.init();
      const auth2 = await window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      console.log('User signed out');
      const lockScreen = document.createElement('div');
      lockScreen.setAttribute('id', 'lock-screen');
      document.getElementById('app').appendChild(lockScreen);
      const signInButton = document.createElement('div');
      signInButton.className = 'g-signin2';
      document.getElementById('lock-screen').appendChild(signInButton);
    } catch (e) {
      console.log('Sign out user error', e);
    }
  });
};

const SignOut = () => (
  <button id="sign-out" onClick={signOutUser}>
    Sign out
  </button>
);

export default SignOut;
