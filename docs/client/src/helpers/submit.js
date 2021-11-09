import { branchSelected } from '../components/buttons/Rewind.jsx';

const onSubmit = (e, token, branch) => {
  e.preventDefault();
  branchSelected(e, token, branch);
};

export default onSubmit;
