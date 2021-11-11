// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import propTypes from 'prop-types';

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

Sure.defaultProps = {
  submitFunction: () => {},
  token: '',
  selectedBranch: '',
  toggleSure: () => {},
};

Sure.propTypes = {
  submitFunction: propTypes.func,
  token: propTypes.string,
  selectedBranch: propTypes.string,
  toggleSure: propTypes.func,
};
