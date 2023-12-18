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
import { getPlayerStatus } from './helpers/apiHelper';

const Content = ({ username }: { username: string }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [rewindTabValue, setRewindTabValue] = useState(0);
  const [inputRoute, setInputRoute] = useState(0);
  const [teleportUserValue, setTeleportUserValue] = useState(0);
  const [playerStatus, setPlayerStatus] = useState([] as string[]);

  const activePlayerCount = playerStatus.length ?? 0;
  const sessionRoute = sessionStorage.getItem('route');
  const route = sessionRoute ? Number(sessionRoute) : inputRoute;

  const handleRoute = (value: number) => {
    setInputRoute(value);
    sessionStorage.setItem('route', value.toString());
  };

  const routes = {
    0: '/home',
    1: '/teleport',
    2: '/rewind',
    3: '/save',
    4: '/message',
    5: '/sfx',
    6: '/settings',
  } as { [key: number]: string };

  const handlePlayers = async () => {
    const players = await getPlayerStatus();
    setPlayerStatus((players as string[]) ?? []);
  };

  useEffect(() => {
    const getPlayers = async () => await handlePlayers();
    getPlayers();
  }, []);

  useEffect(() => {
    const routeKey = Object.keys(routes).find(
      (key) => routes[Number(key)] === location.pathname,
    );
    handleRoute(routeKey ? Number(routeKey) : 0);
  }, [location]);

  const handleChange = (event: SelectChangeEvent<string>): void => {
    const route = routes[Number(event.target.value)];
    if (route) {
      navigate(route);
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
          {route === 0 && <Home activePlayerCount={activePlayerCount} />}
          {route === 1 && (
            <Teleport
              username={users[teleportUserValue]}
              activePlayerCount={activePlayerCount}
            />
          )}
          {route === 2 && (
            <Rewind
              subValue={rewindTabValue}
              activePlayerCount={activePlayerCount}
            />
          )}
          {route === 3 && <Save activePlayerCount={activePlayerCount} />}
          {route === 4 && <Message activePlayerCount={activePlayerCount} />}
          {route === 5 && <Sound activePlayerCount={activePlayerCount} />}
          {route === 6 && (
            <Settings
              username={username}
              activePlayerCount={activePlayerCount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
