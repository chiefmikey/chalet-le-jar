import { h } from 'preact';
import On from './buttons/On.jsx';
import Off from './buttons/Off.jsx';

const lightUp = (ev) => {
  ev.target.classList.add('light-up');
};

const lightOff = (ev) => {
  ev.target.classList.remove('light-up');
};

const Buttons = ({ token }) => (
  <div id="all-buttons">
    <div id="top-buttons">
      <On lightUp={lightUp} lightOff={lightOff} token={token} />
      <Off lightUp={lightUp} lightOff={lightOff} token={token} />
    </div>
    <div id="bottom-buttons">
      <button id="button-refresh" onClick={lightUp}>
        <div className="button-text">
          <h5>REFRESH</h5>
        </div>
      </button>
      <button id="button-save" onClick={lightUp}>
        <div className="button-text">
          <h5>SAVE</h5>
        </div>
      </button>
      <button id="button-rewind" onClick={lightUp}>
        <div className="button-text">
          <h5>REWIND</h5>
        </div>
      </button>
    </div>
  </div>
);

export default Buttons;
