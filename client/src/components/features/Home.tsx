import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
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
    </div>
  );
};

export default Home;
