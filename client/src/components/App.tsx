import { LogtoProvider, LogtoConfig } from '@logto/react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Content from './Content';

const config: LogtoConfig = {
  endpoint: 'https://78isni.logto.app/',
  appId: '5bgp5dgyvlptacynuefma',
};

const App = () => {
  return (
    <LogtoProvider config={config}>
      <Router>
        <div className="wrapper">
          <div className="app">
            <div className="title">
              <img className="logo" src={'/assets/social.png'} alt="logo" />
            </div>
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/*" element={<Content />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LogtoProvider>
  );
};

export default App;
