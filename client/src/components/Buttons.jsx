import { h } from 'preact';
import On from './buttons/On.jsx';

const Buttons = () => (
  <div id="all-buttons">
    <div id="top-buttons">
      <On />
      <button id="button-off">
        <h5>OFF</h5>
      </button>
    </div>
    <div id="bottom-buttons">
      <button id="button-save">
        <h5>SAVE</h5>
      </button>
      <button id="button-refresh">
        <h5>REFRESH</h5>
      </button>
      <button id="button-rewind">
        <h5>REWIND</h5>
      </button>
    </div>
  </div>
);

export default Buttons;
