import { LogtoProvider, LogtoConfig } from '@logto/react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './Auth';
import Login from './Login';

const config: LogtoConfig = {
  endpoint: 'https://login.chaletlejar.com/',
  appId: '5bgp5dgyvlptacynuefma',
};

const App = () => {
  const updatePath = (path: string) => {
    sessionStorage.setItem('path', path);
  };
  const path = sessionStorage.getItem('path') || '/home';

  return (
    <LogtoProvider config={config}>
      <Router>
        <div className="wrapper">
          <img
            className="background-logo"
            src={'/assets/social.png'}
            alt="background logo"
          />
          <Routes>
            <Route
              path="/login"
              element={<Auth path={path} isLogin={true} />}
            />
            <Route
              path="/logout"
              element={<Auth path={path} isLogin={false} />}
            />
            <Route path="/*" element={<Login updatePath={updatePath} />} />
          </Routes>
        </div>
      </Router>
    </LogtoProvider>
  );
};

export default App;
