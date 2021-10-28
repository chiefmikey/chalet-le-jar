import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';
import launchClient from '../libs/ec2Client';

class App extends Component {
  state = { loggedIn: false };

  onLogin = (ev) => {
    ev.preventDefault();
    this.setState({ loggedIn: true });
  };

  onLogout = (ev) => {
    ev.preventDefault();
    this.setState({ loggedIn: false });
  };

  onSignIn = (googleUser) => {
    const { id_token } = googleUser.getAuthResponse();
    document.getElementById('lock-screen').remove();
    launchClient(id_token);
    this.onLogin();
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <div id="app">
        {loggedIn ? (
          <>
            <h1>CHALET LE JAR</h1>
            <SignOut onLogout={this.onLogout} />
            <Buttons />
            <Console />
          </>
        ) : (
          <SignIn onSignIn={onSignIn} />
        )}
      </div>
    );
  }
}

export default App;
