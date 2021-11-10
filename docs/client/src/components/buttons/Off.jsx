// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import state from '../../helpers/state.js';
import commands from '../../helpers/commands.js';

let event;
let offLight;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear').remove();
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
  state(command, token, undefined, complete, error);
};

const submitOff = (token, selectedBranch) => {
  try {
    console.log('Shutting down...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app').append(lockScreen);
    return commands('STOP', token, complete, error, end);
  } catch (error_) {
    console.log('Error creating STOP state', error_);
    error();
    return error_;
  }
};

const Off = ({ lightUp, lightOff, token, toggleSure }) => (
  <button
    type="button"
    id="button-off"
    onClick={(event_) => {
      event_.preventDefault();
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      toggleSure(submitOff, event_);
    }}
  >
    <div className="button-text">
      <h5>OFF</h5>
    </div>
  </button>
);

export default Off;
