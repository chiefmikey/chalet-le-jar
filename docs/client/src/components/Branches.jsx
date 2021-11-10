// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import Branch from './Branch.jsx';
import { submitRewind } from './buttons/Rewind.jsx';

const sendBranch = (token, selectedBranch, toggleModal) => {
  if (selectedBranch) {
    submitRewind(token, selectedBranch);
    toggleModal();
  }
};

const Branches = ({
  submitBranch,
  allBranches,
  toggleModal,
  token,
  selectedBranch,
}) => {
  return (
    <div id="branches">
      {allBranches.length > 0 ? (
        <div id="branches-content">
          <button
            className="modal-button"
            type="button"
            onClick={() => sendBranch(token, selectedBranch, toggleModal)}
          >
            SUBMIT
          </button>
          <ul>
            <Branch branches={allBranches} submitBranch={submitBranch} />
          </ul>
        </div>
      ) : (
        <div id="branches">No backups found</div>
      )}
      <button id="close-button" type="button" onClick={toggleModal}>
        X
      </button>
    </div>
  );
};

export default Branches;
