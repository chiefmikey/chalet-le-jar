import { h } from 'preact';
import state from '../../helpers/state.js';

let event;
let offLight;

const end = () => {
  console.log('Shut down complete');
  offLight(event);
  document.getElementById('lock-screen-clear').remove();
};

const submitOff = (token, end) => {
  try {
    console.log('Shutting down...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.getElementById('app').appendChild(lockScreen);
    return state('STOP', token, end);
  } catch (e) {
    console.log('Error creating STOP state', e);
    return e;
  }
};

const Off = ({ lightUp, lightOff, token }) => (
  <button
    id="button-off"
    onClick={(ev) => {
      ev.preventDefault();
      event = ev;
      offLight = lightOff;
      lightUp(ev);
      submitOff(token, end);
    }}
  >
    <div className="button-text">
      <h5>OFF</h5>
    </div>
  </button>
);

export default Off;
