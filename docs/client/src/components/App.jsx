/* eslint-disable camelcase */
/* eslint-disable react/state-in-constructor */
// eslint-disable-next-line no-unused-vars
import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';
import Branches from './Branches.jsx';
import getBranches from '../libs/ghApi.js';

class App extends Component {
  state = {
    loggedIn: false,
    token: null,
    statement: 'prod',
    modal: false,
    selectedBranch: null,
    allBranches: [],
    previousSelection: null,
  };

  onLogin = (token) => {
    this.setState({ loggedIn: true, token });
  };

  onLogout = () => {
    this.setState({ loggedIn: false });
  };

  onSignIn = (googleUser) => {
    const { id_token } = googleUser.getAuthResponse();
    const email = googleUser.getBasicProfile().getEmail();
    if (email === 'wolfemikl@gmail.com') {
      document.getElementById('lock-screen').remove();
      this.onLogin(id_token);
    }
  };

  toggleDev = (ev) => {
    const { statement } = this.state;
    if (Array.from(ev.target.classList).includes('dev-on')) {
      ev.target.classList.remove('dev-on');
    } else {
      ev.target.classList.add('dev-on');
    }
    if (statement === 'prod') {
      this.setState({ statement: 'dev' });
    } else if (statement === 'dev') {
      this.setState({ statement: 'prod' });
    }
  };

  toggleModal = async (token) => {
    const { modal } = this.state;
    try {
      if (!modal) {
        const get = await getBranches(token);
        const allBranches = Array.isArray(get) ? get : [];
        return this.setState({
          modal: true,
          allBranches: allBranches.reverse(),
        });
      }
      document.getElementById('button-rewind').classList.remove('light-up');
      return this.setState({ modal: false, selectedBranch: null });
    } catch (e) {
      console.log('Error getting branches', e);
      return e;
    }
  };

  submitBranch = (ev) => {
    const { previousSelection } = this.state;
    if (previousSelection) {
      previousSelection.classList.remove('selected-branch');
    }
    ev.target.classList.add('selected-branch');
    this.setState({
      selectedBranch: ev.target.innerText,
      previousSelection: ev.target,
    });
  };

  render() {
    const { loggedIn, token, statement, modal, selectedBranch, allBranches } =
      this.state;
    const showModal = modal ? (
      <Branches
        submitBranch={this.submitBranch}
        allBranches={allBranches}
        toggleModal={this.toggleModal}
        token={token}
        selectedBranch={selectedBranch}
      />
    ) : null;
    return (
      <div id="app">
        {loggedIn ? (
          <div id="main">
            {showModal}
            <div id="header">
              <button type="button" id="dev-switch" onClick={this.toggleDev}>
                DEV
              </button>
              <h1>CHALET LE JAR</h1>
              <SignOut onLogout={this.onLogout} />
            </div>
            <Buttons
              token={token}
              toggleModal={this.toggleModal}
              selectedBranch={selectedBranch}
            />
            <Console statement={statement} />
          </div>
        ) : (
          <SignIn onSignIn={this.onSignIn} />
        )}
      </div>
    );
  }
}

export default App;
