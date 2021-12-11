import { h } from 'preact';

import commands from '../../helpers/commands';

let event: MouseEvent;
let offLight: LightOff;

const allClear = () => {
  offLight(event);
  document.querySelector('#lock-screen-clear')?.remove();
};

const complete = () => {
  console.log('Rewind complete');
  allClear();
};

const error = () => {
  console.log('Rewind was interrupted');
  allClear();
};

const end: EndType = () => {
  complete();
};

export const submitRewind = async (token: string, branch: string) => {
  try {
    const lockScreen = document.createElement('div');
    lockScreen.setAttribute('id', 'lock-screen-clear');
    document.querySelector('#app')?.append(lockScreen);
    await commands('REWIND', token, complete, error, end, branch);
  } catch (error_) {
    console.log('Error creating REWIND state', error_);
    error();
  }
};

export const Rewind = ({
  lightUp,
  lightOff,
  token,
  toggleModal,
}: {
  lightUp: LightUp;
  lightOff: LightOff;
  token: string;
  toggleModal: (
    token: string,
    event_: MouseEvent,
    clear: boolean,
  ) => Promise<void>;
}) => (
  <button
    type="button"
    id="button-rewind"
    onClick={async (event_) => {
      event_.preventDefault();
      console.log('Loading backups...');
      event = event_;
      offLight = lightOff;
      lightUp(event_);
      await toggleModal(token, event_, false);
    }}
  >
    <div className="button-text">
      <h5>REWIND</h5>
    </div>
  </button>
);
