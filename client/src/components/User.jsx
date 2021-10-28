import { h } from 'preact';

const User = () => (
  <div id="lock-screen">
    <div class="g-signin2" data-onsuccess="onSignIn" />
  </div>
);

export default User;
