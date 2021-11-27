import { h } from 'preact';
import propTypes from 'prop-types';

import Branch from './Branch.jsx';
import { submitRewind } from './buttons/Rewind.jsx';

const sendBranch = (token, selectedBranch, toggleModal, event_, toggleSure) => {
  if (selectedBranch) {
    toggleSure(submitRewind);
    toggleModal(token, event_, false);
    console.log('Rewinding...');
  }
};

const closeButton = (toggleModal, token, event_) => {
  console.log('Cancelled');
  toggleModal(token, event_, true);
};

const Branches = ({
  submitBranch,
  allBranches,
  toggleModal,
  token,
  selectedBranch,
  toggleSure,
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
            onClick={(event_) =>
              sendBranch(token, selectedBranch, toggleModal, event_, toggleSure)
            }
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
          onClick={(event_) => closeButton(toggleModal, token, event_)}
        >
          x
        </button>
      </h1>
    </div>
  );
};

export default Branches;

Branches.defaultProps = {
  submitBranch: () => {},
  allBranches: [],
  toggleModal: () => {},
  token: '',
  selectedBranch: '',
  toggleSure: () => {},
};

Branches.propTypes = {
  submitBranch: propTypes.func,
  allBranches: propTypes.oneOfType([propTypes.array]),
  toggleModal: propTypes.func,
  token: propTypes.string,
  selectedBranch: propTypes.string,
  toggleSure: propTypes.func,
};
