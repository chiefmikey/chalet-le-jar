import { h } from 'preact';
import state from '../../helpers/state.js';

const submitOn = async (token) => {
  try {
    console.log('Starting up...');
    const turnOn = await state('START', token);
    console.log('Start up complete', turnOn);
    // repeat dns healthcheck until success
    // or get success response from turnOn/state
    // let dnsHealth = false;
    // while (!dnsHealth) {
    //   dnsHealth = dnsHealthCheck();
    // }
    // while (!turnOn.StartingInstances)
    // when dns is true, turn on server
    // server healthcheck until success
    // when server is true
    // await axios.post('/api/on');
  } catch (e) {
    console.log('Error creating START state', e);
  }
};

const On = ({ lightUp, lightOff, token }) => (
  <button
    id="button-on"
    onClick={async (ev) => {
      ev.preventDefault();
      lightUp(ev);
      await submitOn(token);
      lightOff(ev);
    }}
  >
    <div className="button-text">
      <h5>ON</h5>
    </div>
  </button>
);

export default On;
