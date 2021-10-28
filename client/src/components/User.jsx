import { h } from 'preact';

import launchClient from '../libs/ec2Client';

const onSignIn = (googleUser) => {
  const { id_token } = googleUser.getAuthResponse();
  document.getElementById('sign-in-button').style.display = 'none';
  document.getElementById('lock-screen').style.display = 'none';
  launchClient(id_token);
  console.log('weeeeee');
};

const User = () => (
  <div id="lock-screen">
    <div className="g-signin2" data-onsuccess={onSignIn} />
  </div>
);

export default User;
