import { h } from 'preact';
import axios from 'axios';
import state from '../../helpers/state.js';

const dns = false;
const server = false;

const dnsHealthCheck = async () => {
  const health = await axios.get(`${dns}/health`);
  if (health.data.status === 'UP') {
    return true;
  }
  return false;
};

const serverHealthCheck = async () => {
  const health = await axios.get(`${server}/health`);
  if (health.data.status === 'UP') {
    return true;
  }
  return false;
};

const submitOff = async (token) => {
  try {
    console.log('Shutting down...');
    const turnOff = await state('STOP', token);
    console.log(turnOff);
    // repeat dns healthcheck until success
    // or get success response from turnOff/state
    // let dnsHealth = false;
    // while (!dnsHealth) {
    //   dnsHealth = dnsHealthCheck();
    // }
    // while (!turnOff.StartingInstances)
    // when dns is true, turn on server
    // server healthcheck until success
    // when server is true
    // await axios.post('/api/on');
  } catch (e) {
    console.log('error in submit On', e);
  }
};

const Off = ({ lightUp, lightOff, token }) => (
  <button
    id="button-off"
    onClick={async (ev) => {
      ev.preventDefault();
      lightUp(ev);
      await submitOff(token);
      lightOff(ev);
    }}
  >
    <div className="button-text">
      <h5>OFF</h5>
    </div>
  </button>
);

export default Off;
