// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import propTypes from 'prop-types';
import state from '../../helpers/state.js';
import commands from '../../helpers/commands.js';

let event;
let offLight;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear').remove();
};

const complete = () => {
  console.log('Start up complete');
  allClear();
};

const error = () => {
  console.log('Start up was interrupted');
  allClear();
};

const end = (command, token) => {
  commands(command, token, complete, error);
};

const submitOff = (token) => {
  try {
    console.log('Starting up...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app').append(lockScreen);
    return state('START', token, end, complete, error);
  } catch (error_) {
    console.log('Error creating START state', error_);
    error();
    return error_;
  }
};

const On = ({ lightUp, lightOff, token }) => (
  <button
    type="button"
    id="button-on"
    onClick={(event_) => {
      event_.preventDefault();
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      submitOff(token);
    }}
  >
    <div className="button-text">
      <h5>ON</h5>
    </div>
  </button>
);

export default On;

On.defaultProps = {
  lightUp: () => {},
  lightOff: () => {},
  token: '',
};

On.propTypes = {
  lightUp: propTypes.func,
  lightOff: propTypes.func,
  token: propTypes.string,
};
