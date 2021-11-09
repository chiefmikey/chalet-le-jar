// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import getBranches from '../libs/ghApi.js';
import Branch from './Branch.jsx';

let selectedBranch = '';

const submitBranch = (e) => {
  selectedBranch = e.target.innerHTML;
  return selectedBranch;
};

const sendBranch = () => {};

const Branches = async ({ token }) => {
  try {
    const allBranches = await getBranches();
    return (
      <div id="branches">
        <button type="button" onClick={sendBranch}>
          SUBMIT
        </button>
        <ul>
          <Branch branches={allBranches} submitBranch={submitBranch} />
        </ul>
      </div>
    );
  } catch (e) {
    console.log('Error getting branches', e);
    return e;
  }
};

export default Branches;
