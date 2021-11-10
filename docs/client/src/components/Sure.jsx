// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

const sayYes = (submitFunction, token, selectedBranch, toggleSure) => {
  toggleSure(null, null);
  submitFunction(token, selectedBranch);
  if (selectedBranch) {
    console.log(selectedBranch);
  }
};

const sayNo = (toggleSure) => {
  toggleSure(null, null);
};

const Sure = ({ submitFunction, token, selectedBranch, toggleSure }) => (
  <div id="sure">
    <div id="sure-header">
      <h1>ARE YOU SURE</h1>
    </div>
    <button
      type="button"
      className="sure-button"
      onClick={(ev) =>
        sayYes(submitFunction, token, selectedBranch, toggleSure)
      }
    >
      YES
    </button>
    <button
      type="button"
      className="sure-button"
      onClick={(ev) => sayNo(toggleSure)}
    >
      NO
    </button>
  </div>
);

export default Sure;
