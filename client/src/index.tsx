import './styles.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

const root = createRoot(
  document.querySelector('#app') as Element | DocumentFragment,
);

root.render(<App />);
