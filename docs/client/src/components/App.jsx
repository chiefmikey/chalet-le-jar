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
    console.log('User signed out');
    this.setState({ loggedIn: false, token: undefined });
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

  toggleModal = async (token, event_, clear) => {
    const { modal } = this.state;
    try {
      if (!modal) {
        const get = await getBranches(token);
        const allBranches = Array.isArray(get) ? get : [];
        return this.setState({
          modal: true,
          allBranches: allBranches.reverse().splice(0, 10),
        });
      }
      document.querySelector('#modal-button').classList.remove('light-up');
      if (event_.target.id === 'close-button') {
        document.querySelector('#button-rewind').classList.remove('light-up');
      }
      if (clear) {
        return this.setState({ modal: false, selectedBranch: undefined });
      }
      return this.setState({ modal: false });
    } catch (error) {
      console.log('Error getting branches', error);
      return error;
    }
  };

  toggleSure = (submitFunction, event_, no) => {
    const { sure, pressedButton } = this.state;
    let buttonCopy;
    if (!sure) {
      buttonCopy =
        event_ === undefined
          ? document.querySelector('#button-rewind')
          : event_.target;
      return this.setState({
        sure: true,
        submitFunction,
        pressedButton: buttonCopy,
      });
    }
    if (pressedButton && no) {
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
      latestBranch,
    } = this.state;
    const showModal = modal ? (
      <Branches
        submitBranch={this.submitBranch}
        allBranches={allBranches}
        toggleModal={this.toggleModal}
        token={token}
        selectedBranch={selectedBranch}
        toggleSure={this.toggleSure}
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
              latestBranch={latestBranch}
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
