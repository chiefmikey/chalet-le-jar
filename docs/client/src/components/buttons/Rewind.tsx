import { h } from 'preact';
import propTypes from 'prop-types';

import commands from '../../helpers/commands';

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
      console.log('Loading backups...');
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      toggleModal(token, event_);
    }}
  >
    <div className="button-text">
      <h5>REWIND</h5>
    </div>
  </button>
);

Rewind.defaultProps = {
  lightUp: () => {},
  lightOff: () => {},
  token: '',
  toggleModal: () => {},
};

Rewind.propTypes = {
  lightUp: propTypes.func,
  lightOff: propTypes.func,
  token: propTypes.string,
  toggleModal: propTypes.func,
};
