import { h } from 'preact';
import On from './buttons/On.jsx';

const Buttons = () => (
  <div id="all-buttons">
    <div id="left-buttons">
      <On />
      <button id="button-off">Off</button>
    </div>
    <div id="right-buttons">
      <button id="button-save">Save</button>
      <button id="button-refresh">Refresh</button>
      <button id="button-rewind">Rewind</button>
    </div>
  </div>
);

export default Buttons;
