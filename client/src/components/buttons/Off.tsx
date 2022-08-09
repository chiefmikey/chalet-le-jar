import { h } from 'preact';

import commands from '../../helpers/commands';
import state from '../../helpers/state';

let event: MouseEvent;
let offLight: LightOff;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear')?.remove();
};

const complete = () => {
  console.log('Shut down complete');
  allClear();
};

const error = (error_) => {
  if (error_.name === 'InvalidInstanceId') {
    console.log('Server is already stopped');
  } else {
    console.log('Shut down was interrupted');
  }
  allClear();
};

const end = async (command?: string, token?: string) => {
  await state(command, token, undefined, complete, error);
};

const submitOff = async (token: string) => {
  try {
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app')?.append(lockScreen);
    await commands('STOP', token, complete, error, end);
  } catch (error_) {
    console.log('Error creating STOP state', error_);
    error();
  }
};

const Off = ({
  lightUp,
  lightOff,
  toggleSure,
}: {
  lightUp: LightUp;
  lightOff: LightOff;
  toggleSure: ToggleSure;
}) => (
  <button
    type="button"
    id="button-off"
    onClick={(event_) => {
      event_.preventDefault();
      console.log('Shutting down...');
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      toggleSure(submitOff, event_, false);
    }}
  >
    <div className="button-text">
      <h5>OFF</h5>
    </div>
  </button>
);

export default Off;
