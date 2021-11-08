import { h } from 'preact';
import commands from '../../helpers/commands.js';

let event;
let offLight;

const allClear = () => {
  offLight(event);
  document.getElementById('lock-screen-clear').remove();
};

const complete = () => {
  console.log('Save complete');
  allClear();
};

const error = () => {
  console.log('Save was interrupted');
  allClear();
};

const end = () => {
  complete();
};

const submitSave = (token) => {
  try {
    console.log('Saving...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.getElementById('app').appendChild(lockScreen);
    return commands('SAVE', token, complete, error, end);
  } catch (e) {
    console.log('Error creating SAVE state', e);
    error();
    return e;
  }
};

const Save = ({ lightUp, lightOff, token }) => (
  <button
    id="button-save"
    onClick={(ev) => {
      ev.preventDefault();
      event = ev;
      offLight = lightOff;
      lightUp(ev);
      submitSave(token);
    }}
  >
    <div className="button-text">
      <h5>SAVE</h5>
    </div>
  </button>
);

export default Save;
