import { h } from 'preact';
import state from '../../helpers/state.js';
import commands from '../../helpers/commands.js';

let event;
let offLight;

const complete = () => {
  console.log('Shut down complete');
  offLight(event);
  document.getElementById('lock-screen-clear').remove();
};

const error = () => {
  console.log('Shut down was interrupted');
  offLight(event);
  document.getElementById('lock-screen-clear').remove();
};

const end = (command, token) => {
  state(command, token, null, complete, error);
};

const submitOff = (token) => {
  try {
    console.log('Shutting down...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.getElementById('app').appendChild(lockScreen);
    return commands('STOP', token, complete, error, end);
  } catch (e) {
    console.log('Error creating STOP state', e);
    complete();
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
      submitOff(token);
    }}
  >
    <div className="button-text">
      <h5>OFF</h5>
    </div>
  </button>
);

export default Off;
