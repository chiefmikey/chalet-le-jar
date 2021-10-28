import { h } from 'preact';
import On from './buttons/On.jsx';

const lightUp = (ev) => {
  ev.target.classList.add('light-up');
};

const lightOff = (ev) => {
  ev.target.classList.remove('light-up');
};

const Buttons = () => (
  <div id="all-buttons">
    <div id="top-buttons">
      <On lightUp={lightUp} lightOff={lightOff} />
      <button id="button-off" onClick={lightUp} hidefocus="true">
        <div className="button-text">
          <h5>OFF</h5>
        </div>
      </button>
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
