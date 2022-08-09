import { h } from 'preact';

import commands from '../../helpers/commands';
import state from '../../helpers/state';
import getBranches from '../../libs/ghApi';

let event: MouseEvent;
let offLight: LightOff;
let latest;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear')?.remove();
};

const complete = () => {
  console.log('Start up complete');
  allClear();
};

const error = (error_) => {
  if (error_.name === 'InvalidInstanceId') {
    console.log('Server is already running');
  } else {
    console.log('Start up was interrupted');
  }
  allClear();
};

const end = async (command: string, token: string) => {
  try {
    const get = await getBranches(token);
    const allBranches = Array.isArray(get) ? get : [];
    [latest] = allBranches;
    await commands(
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
  }
};

const submitOn = async (token: string) => {
  try {
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app')?.append(lockScreen);
    await state('START', token, end, complete, error);
  } catch (error_) {
    console.log('Error creating START state', error_);
    error();
  }
};

const On = ({
  lightUp,
  lightOff,
  token,
}: {
  lightUp: LightUp;
  lightOff: LightOff;
  token: string;
}) => (
  <button
    type="button"
    id="button-on"
    onClick={async (event_) => {
      event_.preventDefault();
      console.log('Starting up...');
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      await submitOn(token);
    }}
  >
    <div className="button-text">
      <h5>ON</h5>
    </div>
  </button>
);

export default On;
