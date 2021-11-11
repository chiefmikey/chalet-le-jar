// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import propTypes from 'prop-types';
import commands from '../../helpers/commands.js';

let event;
let offLight;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear').remove();
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
    document.querySelector('#app').append(lockScreen);
    return commands('REFRESH', token, complete, error, end);
  } catch (error_) {
    console.log('Error creating REFRESH state', error_);
    error();
    return error_;
  }
};

const Refresh = ({ lightUp, lightOff, toggleSure }) => (
  <button
    type="button"
    id="button-refresh"
    onClick={(event_) => {
      event_.preventDefault();
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      toggleSure(submitRefresh, event_);
    }}
  >
    <div className="button-text">
      <h5>REFRESH</h5>
    </div>
  </button>
);

export default Refresh;

Refresh.defaultProps = {
  lightUp: () => {},
  lightOff: () => {},
  toggleSure: () => {},
};

Refresh.propTypes = {
  lightUp: propTypes.func,
  lightOff: propTypes.func,
  toggleSure: propTypes.func,
};
