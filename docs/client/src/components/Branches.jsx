// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import Branch from './Branch.jsx';
import { submitRewind } from './buttons/Rewind.jsx';

const sendBranch = (token, selectedBranch, toggleModal) => {
  if (selectedBranch) {
    submitRewind(token, selectedBranch);
    toggleModal(token);
    console.log(selectedBranch);
  }
};

const closeButton = (toggleModal) => {
  console.log('Rewind cancelled');
  toggleModal();
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
          <div id="modal-header">
            <h1>CHOOSE LE DATE</h1>
          </div>
          <ul>
            <Branch branches={allBranches} submitBranch={submitBranch} />
          </ul>
        </div>
      ) : (
        <div id="branches">No backups found</div>
      )}
      <button
        id="close-button"
        type="button"
        onClick={() => closeButton(toggleModal)}
      >
        <h1>x</h1>
      </button>
    </div>
  );
};

export default Branches;
