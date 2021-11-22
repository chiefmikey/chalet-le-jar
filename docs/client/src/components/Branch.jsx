// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

const Branch = ({ branches, submitBranch }) =>
  branches.map((branch) => (
    <li key={branch} className="branch">
      <button
        type="button"
        className="branch-button"
        onClick={submitBranch}
      >{`${branch.slice(0, -9).replace('/', ':')}@${branch.slice(
        -8,
        -3,
      )}`}</button>
    </li>
  ));

export default Branch;
