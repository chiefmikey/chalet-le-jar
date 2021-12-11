import { h } from 'preact';

import Off from './buttons/Off';
import On from './buttons/On';
import Refresh from './buttons/Refresh';
import { Rewind } from './buttons/Rewind';
import Save from './buttons/Save';

const lightUp = (event_: MouseEvent) => {
  (event_.target as Element).classList.add('light-up');
};

const lightOff = (event_: MouseEvent) => {
  (event_.target as Element).classList.remove('light-up');
};

const Buttons = ({
  token,
  toggleModal,
  toggleSure,
}: {
  token: string;
  toggleModal: ToggleModal;
  toggleSure: ToggleSure;
}) => (
  <div id="all-buttons">
    <div id="top-buttons">
      <On lightUp={lightUp} lightOff={lightOff} token={token} />
      <Off lightUp={lightUp} lightOff={lightOff} toggleSure={toggleSure} />
    </div>
    <div id="bottom-buttons">
      <Refresh lightUp={lightUp} lightOff={lightOff} toggleSure={toggleSure} />
      <Save lightUp={lightUp} lightOff={lightOff} token={token} />
      <Rewind
        lightUp={lightUp}
        lightOff={lightOff}
        token={token}
        toggleModal={toggleModal}
      />
    </div>
  </div>
);

export default Buttons;
