import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';
import launchClient from '../libs/ec2Client';

class App extends Component {
  state = { loggedIn: false };

  onLogin = () => {
    this.setState({ loggedIn: true });
  };

  onLogout = () => {
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
          <div id="main">
            <div id="header">
              <h1>CHALET LE JAR</h1>
              <SignOut onLogout={this.onLogout} />
            </div>
            <Buttons />
            <Console />
          </div>
        ) : (
          <SignIn onSignIn={this.onSignIn} />
        )}
      </div>
    );
  }
}

export default App;
