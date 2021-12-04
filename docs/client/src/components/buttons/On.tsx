import { h } from 'preact';
import propTypes from 'prop-types';

import commands from '../../helpers/commands';
import state from '../../helpers/state';
import getBranches from '../../libs/ghApi';

let event;
let offLight;
let latest;

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

const end = async (command, token) => {
  try {
    const get = await getBranches(token);
    const allBranches = Array.isArray(get) ? get : [];
    [latest] = allBranches.reverse();
    return await commands(
      command,
      token,
      complete,
      error,
      undefined,
      undefined,
      latest,
    );
  } catch (error_) {
    console.log('Error getting most recent save', error_);
    return error_;
  }
};

const submitOn = async (token) => {
  try {
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app').append(lockScreen);
    return await state('START', token, end, complete, error);
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
      console.log('Starting up...');
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      submitOn(token);
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
