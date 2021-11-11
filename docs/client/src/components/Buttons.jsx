// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import propTypes from 'prop-types';
import On from './buttons/On.jsx';
import Off from './buttons/Off.jsx';
import Refresh from './buttons/Refresh.jsx';
import Save from './buttons/Save.jsx';
import { Rewind } from './buttons/Rewind.jsx';

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
