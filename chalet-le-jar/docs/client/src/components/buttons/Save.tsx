import { h } from 'preact';

import commands from '../../helpers/commands';

let event: MouseEvent;
let offLight: LightOff;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear')?.remove();
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

const submitSave = async (token: string) => {
  try {
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app')?.append(lockScreen);
    await commands('SAVE', token, complete, error, end);
  } catch (error_) {
    console.log('Error creating SAVE state', error_);
    error();
  }
};

const Save = ({
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
    id="button-save"
    onClick={async (event_) => {
      event_.preventDefault();
      console.log('Saving...');
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      await submitSave(token);
    }}
  >
    <div className="button-text">
      <h5>SAVE</h5>
    </div>
  </button>
);

export default Save;
