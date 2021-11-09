// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

const Branch = ({ branches, submitBranch }) =>
  branches.map((branch) => (
    <li key={branch} className="branch">
      <button
        type="button"
        className="branch-button"
        onClick={submitBranch}
      >{`${branch}`}</button>
    </li>
  ));

export default Branch;
