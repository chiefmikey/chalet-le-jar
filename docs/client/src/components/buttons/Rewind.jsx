// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import commands from '../../helpers/commands.js';

let event;
let offLight;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear').remove();
};

const complete = () => {
  console.log('Rewind complete');
  allClear();
};

const error = () => {
  console.log('Rewind was interrupted');
  allClear();
};

const end = () => {
  complete();
};

export const submitRewind = (token, branch) => {
  try {
    console.log('Rewinding...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app').append(lockScreen);
    return commands('REWIND', token, complete, error, end, branch);
  } catch (error_) {
    console.log('Error creating REWIND state', error_);
    error();
    return error_;
  }
};

export const Rewind = ({ lightUp, lightOff, token, toggleModal }) => (
  <button
    type="button"
    id="button-rewind"
    onClick={(event_) => {
      event_.preventDefault();
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      toggleModal(token, event_);
      console.log('Loading backups...');
    }}
  >
    <div className="button-text">
      <h5>REWIND</h5>
    </div>
  </button>
);
