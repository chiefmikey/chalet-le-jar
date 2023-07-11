import { render, Component, h } from 'preact';

import getBranches from '../libs/ghApi';

import Branches from './Branches';
import Buttons from './Buttons';
import Console from './Console';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Sure from './Sure';

class App extends Component {
  state: StateType = {
    loggedIn: false,
    token: '',
    statement: 'prod',
    modal: false,
    selectedBranch: undefined,
    allBranches: [],
    previousSelection: undefined,
    sure: false,
    submitFunction: () => {},
    pressedButton: undefined,
  };

  onLogin = (token: string) => {
    this.setState({ loggedIn: true, token });
  };

  onLogout = () => {
    console.log('User signed out');
    this.setState({ loggedIn: false, token: '' });
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
        document.querySelector('#lock-screen')?.remove();
      }
      this.onLogin(id_token);
    }
  };

  toggleDev = (event_: MouseEvent) => {
    const { statement } = this.state;
    const element = event_.target as Element;
    if ([...element.classList].includes('dev-on')) {
      element.classList.remove('dev-on');
    } else {
      element.classList.add('dev-on');
    }
    if (statement === 'prod') {
      this.setState({ statement: 'dev' });
    } else if (statement === 'dev') {
      this.setState({ statement: 'prod' });
    }
  };

  toggleModal = async (token: string, event_: MouseEvent, clear: boolean) => {
    const { modal } = this.state;
    try {
      if (modal) {
        document.querySelector('#modal-button')?.classList.remove('light-up');
        if ((event_.target as Element).id === 'close-button') {
          document
            .querySelector('#button-rewind')
            ?.classList.remove('light-up');
        }
        if (clear) {
          this.setState({ modal: false, selectedBranch: undefined });
        }
        this.setState({ modal: false });
      } else {
        const get: string[] = await getBranches(token);
        const allBranches = Array.isArray(get) ? get : [];
        const saveBranches = allBranches.filter(
          (branch: string) =>
            branch.includes('save/') && !branch.includes('autosave/'),
        );
        const sliceSave: string[] = saveBranches.slice(0, 1);
        const autosaveBranches = allBranches.filter((branch: string) =>
          branch.includes('autosave/'),
        );
        const sliceAutosave = autosaveBranches.slice(0, 4);
        this.setState({
          modal: true,
          allBranches: [...sliceSave, ...sliceAutosave],
        });
      }
    } catch (error) {
      console.log('Error getting branches', error);
    }
  };

  toggleSure: ToggleSure = (submitFunction, event_, no) => {
    const { sure, pressedButton } = this.state;
    let buttonCopy;
    if (!sure) {
      buttonCopy =
        event_ === undefined
          ? document.querySelector('#button-rewind')
          : event_.target;
      this.setState({
        sure: true,
        submitFunction,
        pressedButton: buttonCopy,
      });
    } else if ((pressedButton && no) || submitFunction === undefined) {
      pressedButton?.classList.remove('light-up');
      this.setState({
        sure: false,
        submitFunction,
        pressedButton: event_,
      });
    }
  };

  submitBranch = (event_: MouseEvent) => {
    const { previousSelection } = this.state;
    if (previousSelection) {
      previousSelection.classList.remove('selected-branch');
    }
    const element = event_.target as Element;
    element.classList.add('selected-branch');
    document.querySelector('#modal-button')?.classList.add('light-up');
    this.setState({
      selectedBranch: element.textContent,
      previousSelection: element,
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

render(<App />, document.body);
