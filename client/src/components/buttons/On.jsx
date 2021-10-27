import { h } from 'preact';
import axios from 'axios';
import state from '../../helpers/state.js';

const dns = false;
const server = false;

const submitOn = async () => {
  // aws sdk turn on ec2 instance dns
  const startUp = await state('START');
  console.log(startUp);
  // repeat dns healthcheck until success
  // while (!startUp.StartingInstances)
  // when dns is true, turn on server
  // server healthcheck until success
  // when server is true
  // await axios.post('/api/on');
};

const On = () => (
  <button id="button-on" onClick={submitOn}>
    <h5>ON</h5>
  </button>
);

export default On;
