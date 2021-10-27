import { h, render } from 'preact';
import App from './components/App.jsx';
import './styles/index.css';
import smoothscroll from '../../node_modules/smoothscroll-polyfill/dist/smoothscroll.js';

smoothscroll.polyfill();

render(<App />, document.body);
