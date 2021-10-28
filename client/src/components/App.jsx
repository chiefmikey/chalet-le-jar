import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';

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

  render() {
    const { loggedIn } = this.state;
    return (
      <div id="app">
        {loggedIn ? (
          <>
            <h1>CHALET LE JAR</h1>
            <SignOut />
            <Buttons />
            <Console />
          </>
        ) : (
          <SignIn />
        )}
      </div>
    );
  }
}

export default App;
