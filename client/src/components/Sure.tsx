import { h } from 'preact';

const sayYes = async (
  submitFunction: SubmitFunction,
  token: string,
  selectedBranch: PreviousElement | undefined,
  toggleSure: ToggleSure,
) => {
  toggleSure();
  await submitFunction(token, selectedBranch);
};

const sayNo = (toggleSure: ToggleSure) => {
  toggleSure(undefined, undefined, true);
  console.log('Cancelled');
};

const Sure = ({
  submitFunction,
  token,
  selectedBranch,
  toggleSure,
}: {
  submitFunction: SubmitFunction;
  token: string;
  selectedBranch: PreviousElement | undefined;
  toggleSure: ToggleSure;
}) => (
  <div id="sure">
    <div id="sure-header">
      <h1>ARE YOU SURE</h1>
    </div>
    <button
      type="button"
      className="sure-button yes"
      onClick={async () => {
        await sayYes(submitFunction, token, selectedBranch, toggleSure);
      }}
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
