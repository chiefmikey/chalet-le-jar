import { h } from 'preact';
import On from './buttons/On.jsx';

const blurButton = (ev) => {
  setTimeout(() => {
    console.log('ok');
    ev.target.blur();
  }, 1000);
};

const Buttons = () => (
  <div id="all-buttons">
    <div id="top-buttons">
      <On />
      <button id="button-off" onClick={blurButton} hidefocus="true">
        <div className="button-text">
          <h5>OFF</h5>
        </div>
      </button>
    </div>
    <div id="bottom-buttons">
      <button id="button-refresh">
        <div className="button-text">
          <h5>RE</h5>
          <h5>FRESH</h5>
        </div>
      </button>
      <button id="button-save">
        <div className="button-text">
          <h5>SAVE</h5>
        </div>
      </button>
      <button id="button-rewind">
        <div className="button-text">
          <h5>RE</h5>
          <h5>WIND</h5>
        </div>
      </button>
    </div>
  </div>
);

export default Buttons;
