import { h } from 'preact';

import Branch from './Branch';
import { submitRewind } from './buttons/Rewind';

const sendBranch = async (
  token: string,
  selectedBranch: PreviousElement | undefined,
  toggleModal: ToggleModal,
  event_: MouseEvent,
  toggleSure: ToggleSure,
) => {
  if (selectedBranch) {
    toggleSure(submitRewind);
    await toggleModal(token, event_, false);
    console.log('Rewinding...');
  }
};

const closeButton = async (
  toggleModal: ToggleModal,
  token: string,
  event_: MouseEvent,
) => {
  console.log('Cancelled');
  await toggleModal(token, event_, true);
};

const Branches = ({
  submitBranch,
  allBranches,
  toggleModal,
  token,
  selectedBranch,
  toggleSure,
}: {
  submitBranch: (event_: MouseEvent) => void;
  allBranches: string[];
  toggleModal: ToggleModal;
  token: string;
  selectedBranch: PreviousElement | undefined;
  toggleSure: ToggleSure;
}) => {
  return (
    <div id="branches">
      {allBranches.length > 0 ? (
        <div id="branches-content">
          <div id="modal-header">
            <h1>CHOOSE LE DATE</h1>
          </div>
          <ul>
            <Branch allBranches={allBranches} submitBranch={submitBranch} />
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
