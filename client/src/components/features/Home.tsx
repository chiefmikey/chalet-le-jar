import React from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../Footer';

const Home = ({ activePlayerCount }: { activePlayerCount: number }) => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <button className="home-button" onClick={() => navigate('/rewind')}>
        <span>REWIND</span>
      </button>
      <button className="home-button" onClick={() => navigate('/teleport')}>
        <span>TELEPORT</span>
      </button>
      <button className="home-button" onClick={() => navigate('/sfx')}>
        <span>SFX</span>
      </button>
      <button className="home-button" onClick={() => navigate('/message')}>
        <span>MESSAGE</span>
      </button>
      <button className="home-button" onClick={() => navigate('/save')}>
        <span>SAVE</span>
      </button>
      <button className="home-button" onClick={() => navigate('/settings')}>
        <span>SETTINGS</span>
      </button>
      <Footer footerValue="" activePlayerCount={activePlayerCount} />
    </div>
  );
};

export default Home;
