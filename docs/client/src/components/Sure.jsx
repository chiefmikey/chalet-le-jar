// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

const sayYes = (submitFunction, token, selectedBranch, toggleSure) => {
  toggleSure();
  submitFunction(token, selectedBranch);
  if (selectedBranch) {
    console.log(selectedBranch);
  }
};

const sayNo = (toggleSure) => {
  toggleSure();
};

const Sure = ({ submitFunction, token, selectedBranch, toggleSure }) => (
  <div id="sure">
    <div id="sure-header">
      <h1>ARE YOU SURE</h1>
    </div>
    <button
      type="button"
      className="sure-button yes"
      onClick={() => sayYes(submitFunction, token, selectedBranch, toggleSure)}
    >
      YES
    </button>
    <button
      type="button"
      className="sure-button no"
      onClick={() => sayNo(toggleSure)}
    >
      NO
    </button>
  </div>
);

export default Sure;
