import { h } from 'preact';
import commands from '../../helpers/commands.js';

let event;
let offLight;

const allClear = () => {
  offLight(event);
  document.getElementById('lock-screen-clear').remove();
};

const complete = () => {
  console.log('Refresh complete');
  allClear();
};

const error = () => {
  console.log('Refresh was interrupted');
  allClear();
};

const end = () => {
  complete();
};

const submitRefresh = (token) => {
  try {
    console.log('Refreshing...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.getElementById('app').appendChild(lockScreen);
    return commands('REFRESH', token, complete, error, end, null);
  } catch (e) {
    console.log('Error creating REFRESH state', e);
    error();
    return e;
  }
};

const Refresh = ({ lightUp, lightOff, token }) => (
  <button
    type="button"
    id="button-refresh"
    onClick={(ev) => {
      ev.preventDefault();
      event = ev;
      offLight = lightOff;
      lightUp(ev);
      submitRefresh(token);
    }}
  >
    <div className="button-text">
      <h5>REFRESH</h5>
    </div>
  </button>
);

export default Refresh;
