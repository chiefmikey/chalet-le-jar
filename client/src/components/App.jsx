import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';

class App extends Component {
  state = { loggedIn: process.env.NODE_ENV !== 'production', token: null };

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
      console.log('User signed in');
    }
  };

  render() {
    const { loggedIn, token } = this.state;
    return (
      <div id="app">
        {loggedIn ? (
          <div id="main">
            <div id="header">
              <h1>CHALET LE JAR</h1>
              <SignOut onLogout={this.onLogout} />
            </div>
            <Buttons token={token} />
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
