// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import commands from '../../helpers/commands.js';
import Modal from '../Modal.jsx';

let event;
let offLight;

const allClear = () => {
  offLight(event);
  document.getElementById('lock-screen-clear').remove();
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

const submitRewind = (token, branch) => {
  try {
    console.log('Rewinding...');
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.getElementById('app').appendChild(lockScreen);
    return commands('REWIND', token, complete, error, end, branch);
  } catch (e) {
    console.log('Error creating REWIND state', e);
    error();
    return e;
  }
};

const selectBranch = (token) => {
  const insert = <Modal token={token} />;
  document.getElementById('app').append(insert);
};

export const Rewind = ({ lightUp, lightOff, token }) => (
  <button
    type="button"
    id="button-rewind"
    onClick={(ev) => {
      ev.preventDefault();
      event = ev;
      offLight = lightOff;
      lightUp(ev);
      selectBranch(token);
    }}
  >
    <div className="button-text">
      <h5>REWIND</h5>
    </div>
  </button>
);
