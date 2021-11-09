// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

const sayYes = () => {
  console.log('Yes!');
};

const sayNo = () => {
  console.log('No!');
};

const Sure = () => (
  <div id="sure">
    <h1>ARE YOU SURE</h1>
    <button type="button" onClick={sayYes}>
      YES
    </button>
    <button type="button" onClick={sayNo}>
      NO
    </button>
  </div>
);

export default Sure;
