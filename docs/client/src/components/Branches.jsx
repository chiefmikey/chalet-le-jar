// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import Branch from './Branch.jsx';
import { submitRewind } from './buttons/Rewind.jsx';

const sendBranch = (token, selectedBranch, toggleModal, ev) => {
  if (selectedBranch) {
    submitRewind(token, selectedBranch);
    toggleModal(token, ev);
    console.log(selectedBranch);
  }
};

const closeButton = (toggleModal, token, ev) => {
  console.log('Rewind cancelled');
  toggleModal(token, ev);
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
          <div id="modal-header">
            <h1>CHOOSE LE DATE</h1>
          </div>
          <ul>
            <Branch branches={allBranches} submitBranch={submitBranch} />
          </ul>
          <button
            id="modal-button"
            type="button"
            onClick={(ev) => sendBranch(token, selectedBranch, toggleModal, ev)}
          >
            SUBMIT
          </button>
        </div>
      ) : (
        <div id="branches">No backups found</div>
      )}
      <h1>
        <button
          id="close-button"
          type="button"
          onClick={(ev) => closeButton(toggleModal, token, ev)}
        >
          x
        </button>
      </h1>
    </div>
  );
};

export default Branches;
