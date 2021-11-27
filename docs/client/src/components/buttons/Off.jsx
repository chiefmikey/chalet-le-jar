import { h } from 'preact';
import propTypes from 'prop-types';

import commands from '../../helpers/commands.js';
import state from '../../helpers/state.js';

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

const submitOff = (token) => {
  try {
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

const Off = ({ lightUp, lightOff, toggleSure }) => (
  <button
    type="button"
    id="button-off"
    onClick={(event_) => {
      event_.preventDefault();
      console.log('Shutting down...');
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

Off.defaultProps = {
  lightUp: () => {},
  lightOff: () => {},
  toggleSure: () => {},
};

Off.propTypes = {
  lightUp: propTypes.func,
  lightOff: propTypes.func,
  toggleSure: propTypes.func,
};
