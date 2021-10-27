import { h } from 'preact';
import On from './buttons/On.jsx';

const Buttons = () => (
  <div id="all-buttons">
    <div id="top-buttons">
      <On />
      <button id="button-off">
        <h5>O</h5>
        <h5>F</h5>
        <h5>F</h5>
      </button>
    </div>
    <div id="bottom-buttons">
      <button id="button-refresh">
        <h5>R E</h5>
        <h5>F R E S H</h5>
      </button>
      <button id="button-clone">
        <h5>C</h5>
        <h5>L</h5>
        <h5>O N E</h5>
      </button>
      <button id="button-rewind">
        <h5>R E W</h5>
        <h5>I N D</h5>
      </button>
    </div>
  </div>
);

export default Buttons;
