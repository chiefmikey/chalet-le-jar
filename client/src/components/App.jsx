import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';

class App extends Component {
  state = { value: '', name: 'world' };

  onInput = (ev) => {
    this.setState({ value: ev.target.value });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ name: this.state.value });
  };

  render() {
    return (
      <div id="app">
        <SignIn />
        <h1>CHALET LE JAR</h1>
        <SignOut />
        <Buttons />
        <Console />
      </div>
    );
  }
}

export default App;
