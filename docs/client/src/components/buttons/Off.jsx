import { h } from 'preact';
import state from '../../helpers/state.js';
import commands from '../../helpers/commands.js';

let event;
let offLight;

const allClear = () => {
  offLight(event);
  document.getElementById('lock-screen-clear').remove();
};

const complete = () => {
  console.log('Shut down complete');
  allClear();
};

const error = () => {
  console.log('Shut down was interrupted');
  allClear();
};

const end = (command, token) => {
  state(command, token, null, complete, error);
};

const submitOff = (token, selectedBranch) => {
  try {
    console.log('Shutting down...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.getElementById('app').appendChild(lockScreen);
    return commands('STOP', token, complete, error, end, null);
  } catch (e) {
    console.log('Error creating STOP state', e);
    error();
    return e;
  }
};

const Off = ({ lightUp, lightOff, token, toggleSure }) => (
  <button
    type="button"
    id="button-off"
    onClick={(ev) => {
      ev.preventDefault();
      event = ev;
      offLight = lightOff;
      lightUp(ev);
      toggleSure(submitOff, ev);
    }}
  >
    <div className="button-text">
      <h5>OFF</h5>
    </div>
  </button>
);

export default Off;
