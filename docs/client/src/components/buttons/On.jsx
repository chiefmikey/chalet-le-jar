// eslint-disable-next-line no-unused-vars
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
  console.log('Start up complete');
  allClear();
};

const error = () => {
  console.log('Start up was interrupted');
  allClear();
};

const end = (command, token) => {
  commands(command, token, complete, error, null, null);
};

const submitOff = (token) => {
  try {
    console.log('Starting up...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.getElementById('app').appendChild(lockScreen);
    return state('START', token, end, complete, error);
  } catch (e) {
    console.log('Error creating START state', e);
    error();
    return e;
  }
};

const On = ({ lightUp, lightOff, token }) => (
  <button
    type="button"
    id="button-on"
    onClick={(ev) => {
      ev.preventDefault();
      event = ev;
      offLight = lightOff;
      lightUp(ev);
      submitOff(token);
    }}
  >
    <div className="button-text">
      <h5>ON</h5>
    </div>
  </button>
);

export default On;
