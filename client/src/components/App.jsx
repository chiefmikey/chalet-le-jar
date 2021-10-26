import { h, Component } from 'preact';
import Buttons from './Buttons.jsx';
import Console from './Console.jsx';

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
        <h1>CHALET LE JAR</h1>
        <Buttons />
        <Console />
      </div>
    );
  }
}

export default App;
