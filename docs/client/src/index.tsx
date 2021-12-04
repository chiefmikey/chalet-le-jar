import 'airbnb-browser-shims';
import 'the-new-css-reset/css/reset.css';
import './styles/index.css';
import { h, render } from 'preact';

import App from './components/App';

render(<App />, document.body);
