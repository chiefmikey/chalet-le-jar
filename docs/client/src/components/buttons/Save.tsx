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
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app').append(lockScreen);
    return commands('SAVE', token, complete, error, end);
  } catch (error_) {
    console.log('Error creating SAVE state', error_);
    error();
    return error_;
  }
};

const Save = ({ lightUp, lightOff, token }) => (
  <button
    type="button"
    id="button-save"
    onClick={(event_) => {
      event_.preventDefault();
      console.log('Saving...');
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      submitSave(token);
    }}
  >
    <div className="button-text">
      <h5>SAVE</h5>
    </div>
  </button>
);

export default Save;

Save.defaultProps = {
  lightUp: () => {},
  lightOff: () => {},
  token: '',
};

Save.propTypes = {
  lightUp: propTypes.func,
  lightOff: propTypes.func,
  token: propTypes.string,
};
