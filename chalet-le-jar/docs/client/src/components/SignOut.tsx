/* eslint-disable github/no-then */
import { h } from 'preact';

const signOutUser = (onLogout: () => void) => {
  (
    window.gapi.load as (service: string, callback: () => Promise<void>) => void
  )('auth2', () =>
    (
      (
        window.gapi.auth2 as {
          init: (parameters: gapi.auth2.ClientConfig) => gapi.auth2.GoogleAuth;
        }
      ).init({}) as {
        then: (inputAction: () => gapi.auth2.GoogleAuth) => {
          then: (
            inputAction: (response: {
              signOut: () => gapi.auth2.GoogleAuth;
            }) => gapi.auth2.GoogleAuth,
          ) => {
            then: (inputAction: () => void) => Promise<void>;
          };
        };
      }
    )
      .then(() => window.gapi.auth2.getAuthInstance())
      .then((response) => response.signOut())
      .then(() => onLogout()),
  );
};

const SignOut = ({ onLogout }: { onLogout: () => void }) => (
  <button
    type="button"
    id="sign-out"
    onClick={(event_) => {
      event_.preventDefault();
      signOutUser(onLogout);
    }}
  >
    SIGN OUT
  </button>
);

export default SignOut;
