import { h } from 'preact';
import axios from 'axios';
import state from '../../helpers/state.js';

const dns = false;
const server = false;

const healthCheck = async () => {
  const health = await axios.get(`${dns}/health`);
  if (health.data.status === 'UP') {
    return true;
  }
};

const submitOn = async () => {
  // aws sdk turn on ec2 instance dns
  const startUp = await state('START');
  if (!startUp) {
    return true;
  }
  console.log(startUp);
  // repeat dns healthcheck until success

  healthCheck();

  // while (!startUp.StartingInstances)
  // when dns is true, turn on server
  // server healthcheck until success
  // when server is true
  // await axios.post('/api/on');
};

const On = ({ lightUp, lightOff }) => (
  <button
    id="button-on"
    onClick={async (ev) => {
      ev.preventDefault();
      lightUp(ev);
      await submitOn();
      lightOff(ev);
    }}
  >
    <div className="button-text">
      <h5>ON</h5>
    </div>
  </button>
);

export default On;
