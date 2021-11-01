import { h } from 'preact';
import state from '../../helpers/state.js';

const submitOn = async (token) => {
  try {
    console.log('Starting up...');
    const startUp = await state('START', token);
    // repeat dns healthcheck until success
    // or get success response from startUp/state
    // let dnsHealth = false;
    // while (!dnsHealth) {
    //   dnsHealth = dnsHealthCheck();
    // }
    // while (!startUp.StartingInstances)
    // when dns is true, turn on server
    // server healthcheck until success
    // when server is true
    // await axios.post('/api/on');
  } catch (e) {
    console.log('error in submit On', e);
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
