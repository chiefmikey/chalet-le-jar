import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';

class App extends Component {
  state = {
    loggedIn: false,
    token: null,
    statement: 'prod',
  };

  onLogin = (token) => {
    this.setState({ loggedIn: true, token });
  };

  onLogout = () => {
    this.setState({ loggedIn: false });
  };

  onSignIn = (googleUser) => {
    // eslint-disable-next-line camelcase
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

  render() {
    const { loggedIn, token, statement } = this.state;
    return (
      <div id="app">
        {loggedIn ? (
          <div id="main">
            <div id="header">
              <button id="dev-switch" onClick={this.toggleDev}>
                DEV
              </button>
              <h1>CHALET LE JAR</h1>
              <SignOut onLogout={this.onLogout} />
            </div>
            <Buttons token={token} />
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
