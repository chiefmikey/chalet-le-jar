import { h } from 'preact';
import state from '../../helpers/state.js';

const submitOff = async (token) => {
  try {
    console.log(token);
    console.log('Shutting down...');
    const turnOff = await state('STOP', token);
    console.log('Shut down complete', turnOff);
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
    console.log('Error creating STOP state', e);
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
