import React from 'react';

import Content from './Content';

const App = () => {
  return (
    <div className="wrapper">
      <div className="app">
        <div className="title">
          <img className="logo" src={'/assets/social.png'} alt="logo" />
        </div>
        <Content />
      </div>
    </div>
  );
};

export default App;
