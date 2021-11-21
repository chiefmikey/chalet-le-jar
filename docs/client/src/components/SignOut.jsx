// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import propTypes from 'prop-types';

const signOutUser = (onLogout) => {
  window.gapi.load('auth2', async () => {
    try {
      await window.gapi.auth2.init();
      const auth2 = await window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      onLogout();
    } catch (error) {
      console.log('Sign out user error', error);
    }
  });
};

const SignOut = ({ onLogout }) => (
  <button
    type="button"
    id="sign-out"
    onClick={async (event_) => {
      event_.preventDefault();
      await signOutUser(onLogout);
    }}
  >
    SIGN OUT
  </button>
);

export default SignOut;

SignOut.propTypes = {
  onLogout: propTypes.func,
};

SignOut.defaultProps = {
  onLogout: () => {},
};
