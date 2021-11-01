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
  console.log('Shutting down...');
  setInterval(async () => {
    try {
      const turnOff = await state('STOP', token);
      for (let i = 0; i < turnOff.length; i += 1) {
        console.log('Instance 1: ', turnOff[i].previousState.name);
        console.log('Instance 2: ', turnOff[i].currentState.name);
      }
    } catch (e) {
      console.log('error in STOP command', e);
    }
  }, 1000);
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
