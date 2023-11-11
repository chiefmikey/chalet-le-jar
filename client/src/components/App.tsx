import React from 'react';

const App = () => {
  const test = '';

  return (
    <div className="background">
      <div className="app">
        <div className="title">
          <span className="title-1">Tomorrow</span>
          <span className="title-2">Night</span>
          <span className="title-3">Darkly</span>
        </div>
        <div className="content">
          <span className="content-title">
            A <span className="simply-dark">Simply Dark</span> Theme
          </span>
          <div className="content-selection"></div>
        </div>
        <span className="made-by">
          <a
            href="https://github.com/chiefmikey"
            target="_blank"
            rel="noreferrer"
          >
            Made by Chief Mikey
          </a>
        </span>
      </div>
    </div>
  );
};

export default App;
