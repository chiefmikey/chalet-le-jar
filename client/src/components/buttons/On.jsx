import { h } from 'preact';
import state from '../../helpers/state.js';

let event;
let offLight;

const end = () => {
  console.log('Start up complete');
  event.target.style.pointerEvents = 'auto';
  offLight(event);
  document.getElementById('lock-screen-clear').remove();
};

const submitOff = (token, end) => {
  try {
    console.log('Starting up...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.getElementById('app').appendChild(lockScreen);
    return state('START', token, end);
  } catch (e) {
    console.log('Error creating START state', e);
    return e;
  }
};

const On = ({ lightUp, lightOff, token }) => (
  <button
    id="button-on"
    onClick={(ev) => {
      ev.preventDefault();
      event = ev;
      offLight = lightOff;
      lightUp(ev);
      submitOff(token, end);
    }}
  >
    <div className="button-text">
      <h5>ON</h5>
    </div>
  </button>
);

export default On;
