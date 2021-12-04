import { Component, h } from 'preact';

import getBranches from '../libs/ghApi';

import Branches from './Branches';
import Buttons from './Buttons';
import Console from './Console';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Sure from './Sure';

interface GoogleUser {
  getAuthResponse: () => {
    id_token: string;
  };
  getBasicProfile: () => {
    getEmail: () => string;
  };
}

interface HTMLElement {
  target: {
    classList: {
      includes: (argument: string) => boolean;
      add: (argument: string) => void;
      remove: (argument: string) => void;
    };
  };
}

interface PreviousElement {
  classList: {
    remove: (argument: string) => void;
  };
}

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

  onLogin = (token: string) => {
    this.setState({ loggedIn: true, token });
  };

  onLogout = () => {
    console.log('User signed out');
    this.setState({ loggedIn: false, token: undefined });
  };

  onSignIn = (googleUser: GoogleUser) => {
    const { id_token } = googleUser.getAuthResponse();
    const email = googleUser.getBasicProfile().getEmail();
    if (
      email === 'wolfemikl@gmail.com' ||
      email === 'willfinn33@gmail.com' ||
      email === 'michael@viviani.net' ||
      email === 'brianna@viviani.net'
    ) {
      if (typeof document.querySelector('#lock-screen') !== null) {
        document.querySelector('#lock-screen').remove();
      }
      this.onLogin(id_token);
    }
  };

  toggleDev = (event_: HTMLElement) => {
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

  toggleModal = async (token: string, event_: HTMLElement, clear) => {
    const { modal } = this.state;
    try {
      if (!modal) {
        const get: string[] = await getBranches(token);
        const allBranches: string[] = Array.isArray(get) ? get : [];
        const reverseOrder: string[] = allBranches.reverse();
        const saveBranches: string[] = reverseOrder.filter(
          (branch: string) =>
            branch.includes('save/') && !branch.includes('autosave/'),
        );
        const sliceSave: string[] = saveBranches.slice(0, 5);
        const autosaveBranches = reverseOrder.filter((branch: string) =>
          branch.includes('autosave/'),
        );
        const sliceAutosave = autosaveBranches.slice(0, 9);
        return this.setState({
          modal: true,
          allBranches: [...sliceSave, ...sliceAutosave],
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

  submitBranch = (event_: HTMLElement) => {
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
