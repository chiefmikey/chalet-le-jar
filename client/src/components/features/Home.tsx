import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <button
        className="home-button home-button-0"
        onClick={() => navigate('/rewind')}
      >
        <span>REWIND</span>
      </button>
      <button
        className="home-button home-button-1"
        onClick={() => navigate('/teleport')}
      >
        <span>TELEPORT</span>
      </button>
      <button
        className="home-button home-button-2"
        onClick={() => navigate('/sfx')}
      >
        <span>SFX</span>
      </button>
      <button
        className="home-button home-button-3"
        onClick={() => navigate('/message')}
      >
        <span>MESSAGE</span>
      </button>
      <button
        className="home-button home-button-4"
        onClick={() => navigate('/save')}
      >
        <span>SAVE</span>
      </button>
    </div>
  );
};

export default Home;
