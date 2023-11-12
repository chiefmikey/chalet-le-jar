import React from 'react';

import Content from './Content';

const App = () => {
  const test = '';

  return (
    <div className="background">
      <div className="app">
        <div className="title">
          <span className="title-1">Chalet le Jar</span>
        </div>
        <Content />
        <span className="made-by">
          <a
            href="https://github.com/chiefmikey/chalet-le-jar"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
        </span>
      </div>
    </div>
  );
};

export default App;
