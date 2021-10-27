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
        <h5>OFF</h5>
      </button>
    </div>
    <div id="bottom-buttons">
      <button id="button-refresh">
        <h5>RE</h5>
        <h5>FRESH</h5>
      </button>
      <button id="button-save">
        <h5>SAVE</h5>
      </button>
      <button id="button-rewind">
        <h5>RE</h5>
        <h5>WIND</h5>
      </button>
    </div>
  </div>
);

export default Buttons;
