import { h } from 'preact';

const signOutUser = async () => {
  try {
    await window.gapi.load('auth2', async () => {
      await window.gapi.auth2.init();
      const auth2 = await window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      console.log('User signed out');
      // document.getElementsByClassName('g-signin2').style.display = 'visible';
      document.getElementById('lock-screen').style.display = 'visible';
    });
  } catch (e) {
    console.log('Sign out user error', e);
  }
};

const SignOut = () => (
  <button id="sign-out" onClick={signOutUser}>
    Sign out
  </button>
);

export default SignOut;
