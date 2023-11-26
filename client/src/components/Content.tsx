import { SelectChangeEvent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { users } from '../constants';

import Nav from './Nav';
import Home from './features/Home';
import Message from './features/Message';
import Rewind from './features/Rewind';
import Save from './features/Save';
import Settings from './features/Settings';
import Sound from './features/Sound';
import Teleport from './features/Teleport';

const Content = ({ username }: { username: string }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [rewindTabValue, setRewindTabValue] = useState(0);
  const [inputRoute, setInputRoute] = useState(0);
  const [teleportUserValue, setTeleportUserValue] = useState(0);

  const sessionRoute = sessionStorage.getItem('route');
  const route = sessionRoute ? Number(sessionRoute) : inputRoute;

  const handleRoute = (value: number) => {
    setInputRoute(value);
    sessionStorage.setItem('route', value.toString());
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/home': {
        handleRoute(0);
        break;
      }
      case '/teleport': {
        handleRoute(1);
        break;
      }
      case '/rewind': {
        handleRoute(2);
        break;
      }
      case '/save': {
        handleRoute(3);
        break;
      }
      case '/message': {
        handleRoute(4);
        break;
      }
      case '/sfx': {
        handleRoute(5);
        break;
      }
      case '/settings': {
        handleRoute(6);
        break;
      }
      default: {
        handleRoute(0);
        break;
      }
    }
  }, [location]);

  const handleChange = (event: SelectChangeEvent<string>): void => {
    switch (Number(event.target.value)) {
      case 0: {
        navigate('/home');
        break;
      }
      case 1: {
        navigate('/teleport');
        break;
      }
      case 2: {
        navigate('/rewind');
        break;
      }
      case 3: {
        navigate('/save');
        break;
      }
      case 4: {
        navigate('/message');
        break;
      }
      case 5: {
        navigate('/sfx');
        break;
      }
      case 6: {
        navigate('/settings');
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div className="app">
      <div className="title">
        <img className="logo" src={'/assets/social.png'} alt="logo" />
      </div>
      <Nav
        route={route}
        rewindTabValue={rewindTabValue}
        setRewindTabValue={setRewindTabValue}
        username={username}
        handleChange={handleChange}
        teleportUserValue={teleportUserValue}
        setTeleportUserValue={setTeleportUserValue}
      />
      <div className="content">
        <div className="content-selection">
          {route === 0 && <Home />}
          {route === 1 && <Teleport username={users[teleportUserValue]} />}
          {route === 2 && <Rewind subValue={rewindTabValue} />}
          {route === 3 && <Save />}
          {route === 4 && <Message />}
          {route === 5 && <Sound />}
          {route === 6 && <Settings username={username} />}
        </div>
      </div>
    </div>
  );
};

export default Content;
