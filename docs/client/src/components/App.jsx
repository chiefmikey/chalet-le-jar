// eslint-disable-next-line no-unused-vars
import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';
import Branches from './Branches.jsx';
import getBranches from '../libs/ghApi.js';
import Sure from './Sure.jsx';

class App extends Component {
  state = {
    loggedIn: false,
    token: undefined,
    statement: 'prod',
    modal: false,
    selectedBranch: undefined,
    allBranches: [],
    previousSelection: undefined,
    sure: false,
    submitFunction: undefined,
    pressedButton: undefined,
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
      document.querySelector('#lock-screen').remove();
      this.onLogin(id_token);
    }
  };

  toggleDev = (event_) => {
    const { statement } = this.state;
    if ([...event_.target.classList].includes('dev-on')) {
      event_.target.classList.remove('dev-on');
    } else {
      event_.target.classList.add('dev-on');
    }
    if (statement === 'prod') {
      this.setState({ statement: 'dev' });
    } else if (statement === 'dev') {
      this.setState({ statement: 'prod' });
    }
  };

  toggleModal = async (token, event_) => {
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
      document.querySelector('#modal-button').classList.remove('light-up');
      if (event_.target.id === 'close-button') {
        document.querySelector('#button-rewind').classList.remove('light-up');
      }
      return this.setState({ modal: false, selectedBranch: undefined });
    } catch (error) {
      console.log('Error getting branches', error);
      return error;
    }
  };

  toggleSure = (submitFunction, event_) => {
    const { sure, pressedButton } = this.state;
    let buttonCopy;
    if (!sure) {
      if (event_ === undefined) {
        buttonCopy = document.querySelector('#button-rewind');
      }
      buttonCopy = event_.target;
      return this.setState({
        sure: true,
        submitFunction,
        pressedButton: buttonCopy,
      });
    }
    if (pressedButton) {
      pressedButton.classList.remove('light-up');
    }
    return this.setState({
      sure: false,
      submitFunction,
      pressedButton: event_,
    });
  };

  submitBranch = (event_) => {
    const { previousSelection } = this.state;
    if (previousSelection) {
      previousSelection.classList.remove('selected-branch');
    }
    event_.target.classList.add('selected-branch');
    document.querySelector('#modal-button').classList.add('light-up');
    this.setState({
      selectedBranch: event_.target.textContent,
      previousSelection: event_.target,
    });
  };

  render() {
    const {
      loggedIn,
      token,
      statement,
      modal,
      selectedBranch,
      allBranches,
      sure,
      submitFunction,
    } = this.state;
    const showModal = modal ? (
      <Branches
        submitBranch={this.submitBranch}
        allBranches={allBranches}
        toggleModal={this.toggleModal}
        token={token}
        selectedBranch={selectedBranch}
      />
    ) : undefined;
    const showSure = sure ? (
      <Sure
        submitFunction={submitFunction}
        token={token}
        selectedBranch={selectedBranch}
        toggleSure={this.toggleSure}
      />
    ) : undefined;
    return (
      <div id="app">
        {loggedIn ? (
          <div id="main">
            {showModal}
            {showSure}
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
              toggleSure={this.toggleSure}
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
