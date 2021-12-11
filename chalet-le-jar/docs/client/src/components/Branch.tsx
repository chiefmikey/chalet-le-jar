import { h } from 'preact';

const Branch = ({
  allBranches,
  submitBranch,
}: {
  allBranches: string[];
  submitBranch: (event_: MouseEvent) => void;
}) =>
  allBranches.map((branch) => (
    <li key={branch} className="branch">
      <button
        type="button"
        className="branch-button"
        onClick={submitBranch}
      >{`${branch}`}</button>
    </li>
  ));

export default Branch;
