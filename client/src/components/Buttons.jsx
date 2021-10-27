import { h } from 'preact';
import On from './buttons/On.jsx';

const store = {};

const blurButton = (ev) => {
  ev.preventDefault();
  if (!store[ev.target.id]) {
    ev.target.addEventListener(
      'touchstart',
      () => {
        setTimeout(() => {
          console.log('ok');
          ev.target.blur();
        }, 1000);
      },
      { passive: true },
    );
    store[ev.target.id] = true;
  }
};

const Buttons = () => (
  <div id="all-buttons">
    <div id="top-buttons">
      <On />
      <button id="button-off" onClick={blurButton}>
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
