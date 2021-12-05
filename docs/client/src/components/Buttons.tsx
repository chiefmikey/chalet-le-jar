import { h } from 'preact';
import propTypes from 'prop-types';

import Off from './buttons/Off';
import On from './buttons/On';
import Refresh from './buttons/Refresh';
import { Rewind } from './buttons/Rewind';
import Save from './buttons/Save';

const lightUp = (event_) => {
  event_.target.classList.add('light-up');
};

const lightOff = (event_) => {
  event_.target.classList.remove('light-up');
};

const Buttons = ({ token, toggleModal, toggleSure }) => (
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
        toggleSure={toggleSure}
      />
    </div>
  </div>
);

export default Buttons;

Buttons.defaultProps = {
  token: '',
  toggleModal: () => {},
  toggleSure: () => {},
};

Buttons.propTypes = {
  token: propTypes.string,
  toggleModal: propTypes.func,
  toggleSure: propTypes.func,
};
