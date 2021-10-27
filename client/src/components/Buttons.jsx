import { h } from 'preact';
import On from './buttons/On.jsx';

const buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', () => {
    setTimeout(() => buttons[i].blur(), 100);
  });
}

const Buttons = () => (
  <div id="all-buttons">
    <div id="top-buttons">
      <On />
      <button id="button-off">
        <h5>OFF</h5>
      </button>
    </div>
    <div id="bottom-buttons">
      <button id="button-refresh">
        <h5>REFRESH</h5>
      </button>
      <button id="button-save">
        <h5>SAVE</h5>
      </button>
      <button id="button-rewind">
        <h5>REWIND</h5>
      </button>
    </div>
  </div>
);

export default Buttons;
