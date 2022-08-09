import { h } from 'preact';

import commands from '../../helpers/commands';

let event: MouseEvent;
let offLight: LightOff;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear')?.remove();
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

const submitRefresh = async (token: string) => {
  try {
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app')?.append(lockScreen);
    await commands('REFRESH', token, complete, error, end);
  } catch (error_) {
    console.log('Error creating REFRESH state', error_);
    error();
  }
};

const Refresh = ({
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
    id="button-refresh"
    onClick={(event_) => {
      event_.preventDefault();
      console.log('Refreshing...');
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      toggleSure(submitRefresh, event_, false);
    }}
  >
    <div className="button-text">
      <h5>REFRESH</h5>
    </div>
  </button>
);

export default Refresh;
