// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

const Branch = ({ branches, submitBranch }) =>
  branches.map((branch) => (
    <li
      key={branch.name}
      className="branch"
      onClick={(e) => {
        e.target.className('selected-branch');
        submitBranch(e);
      }}
    >{`${branch}`}</li>
  ));

export default Branch;
