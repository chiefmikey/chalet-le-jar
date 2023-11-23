import { UserInfoResponse } from '@logto/react';
import {
  AppBar,
  Tabs,
  Tab,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Home from './features/Home';
import Message from './features/Message';
import Rewind from './features/Rewind';
import Save from './features/Save';
import Sound from './features/Sound';
import Teleport from './features/Teleport';

const Content = ({ user }: { user: UserInfoResponse | undefined }) => {
  const navigate = useNavigate();
  const username = user?.username ? user.username.replaceAll('_', ' ') : '';
  const location = useLocation();
  const [subValue, setSubValue] = useState(0);
  const [route, setRoute] = useState(0);
  const users = [
    'rotttttt',
    'AverageThyme486',
    'MortalCaribou91',
    'HUNGLIKE12',
    'gajdra',
    'L0ST UN1C0RN',
    'Minty Fresh1515',
    'Dark Zelda92',
  ];
  const values = {
    1: 'REWIND',
    2: 'TELEPORT',
    3: 'SFX',
    4: 'MESSAGE',
    5: 'SAVE',
  } as {
    [key: number]: string;
  };

  useEffect(() => {
    if (route === 2) {
      setSubValue(users.indexOf(username));
    }
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case '/home': {
        setRoute(0);
        break;
      }
      case '/rewind': {
        setRoute(1);
        break;
      }
      case '/teleport': {
        setRoute(2);
        break;
      }
      case '/sfx': {
        setRoute(3);
        break;
      }
      case '/message': {
        setRoute(4);
        break;
      }
      case '/save': {
        setRoute(5);
        break;
      }
      default: {
        setRoute(0);
        break;
      }
    }
  }, [location]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    switch (event.target.value as number) {
      case 0: {
        navigate('/home');
        break;
      }
      case 1: {
        navigate('/rewind');
        break;
      }
      case 2: {
        navigate('/teleport');
        break;
      }
      case 3: {
        navigate('/sfx');
        break;
      }
      case 4: {
        navigate('/message');
        break;
      }
      case 5: {
        navigate('/save');
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSubChange = (
    event: SyntheticEvent<Element, Event>,
    value: number,
  ) => {
    setSubValue(value);
  };

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setSubValue(Number(event.target.value));
  };

  const menuItems = [];
  for (const value of Object.keys(values)) {
    const numberValue = Number(value);
    const label = values[numberValue];

    menuItems.push(
      <MenuItem
        value={numberValue}
        key={numberValue}
        style={{
          backgroundColor: route === numberValue ? '#437420' : '#5e853d',
          fontWeight: '600',
          fontSize: '3rem',
          height: '12vh',
        }}
      >
        {label}
      </MenuItem>,
    );
  }

  const userItems = [];
  for (const user of Object.keys(users)) {
    const userValue = Number(user);
    const label = users[userValue];

    userItems.push(
      <MenuItem
        value={userValue}
        key={userValue}
        style={{
          backgroundColor: subValue === userValue ? '#437420' : '#5e853d',
          fontWeight: '600',
          fontSize: '3rem',
          height: '12vh',
        }}
      >
        {label}
      </MenuItem>,
    );
  }

  return (
    <div className="app">
      <div className="title">
        <img className="logo" src={'/assets/social.png'} alt="logo" />
      </div>
      <div className="nav">
        <AppBar
          position="static"
          style={{
            alignItems: 'center',
          }}
        >
          <Select
            value={route}
            onChange={handleChange}
            displayEmpty
            renderValue={() => {
              if (route === 0) {
                return '⇩';
              }
              return values[route];
            }}
            variant="standard"
            disableUnderline
            SelectDisplayProps={{
              style: {
                borderRadius: '0',
                border: 'none',
                textAlign: 'center',
                width: '100vw',
                left: '0',
              },
            }}
            sx={{
              backgroundColor: '#7db04f',
              borderRadius: '0',
              border: 'none',
              textAlign: 'center',
              width: '100%',
              height: '8vh',
              display: 'flex',
              alignItems: 'center',
            }}
            classes={{
              root: 'select-menu',
              icon: 'white-icon',
            }}
          >
            {menuItems}
          </Select>
          {route === 1 && (
            <Tabs
              value={subValue}
              TabIndicatorProps={{
                style: {
                  display: 'none',
                },
              }}
              onChange={handleSubChange}
              variant="standard"
              sx={{
                borderRadius: '0',
                border: 'none',
                textAlign: 'center',
                height: '6vh',
              }}
            >
              <Tab
                value={0}
                sx={{
                  maxWidth: 'none',
                  backgroundColor: subValue === 0 ? '#5e853d' : '#437420',
                  flex: 1,
                  height: '6vh',
                }}
                classes={{
                  root: 'tab-menu',
                }}
                label="Autosave"
              />
              <Tab
                value={1}
                sx={{
                  maxWidth: 'none',
                  backgroundColor: subValue === 1 ? '#5e853d' : '#437420',
                  height: '6vh',
                }}
                classes={{
                  root: 'tab-menu',
                }}
                label="Save"
              />
            </Tabs>
          )}
          {route === 2 && (
            <Select
              value={String(subValue)}
              onChange={handleUserChange}
              variant="standard"
              disableUnderline
              SelectDisplayProps={{
                style: {
                  borderRadius: '0',
                  border: 'none',
                  textAlign: 'center',
                  width: '100vw',
                  left: '0',
                },
              }}
              sx={{
                backgroundColor: subValue === 1 ? '#5e853d' : '#437420',
                borderRadius: '0',
                border: 'none',
                textAlign: 'center',
                width: '100%',
                height: '8vh',
                display: 'flex',
                alignItems: 'center',
              }}
              classes={{
                root: 'select-menu',
                icon: 'white-icon',
              }}
            >
              {userItems}
            </Select>
          )}
        </AppBar>
      </div>
      <div className="content">
        <div className="content-selection">
          {route === 0 && <Home />}
          {route === 1 && <Rewind subValue={subValue} />}
          {route === 2 && <Teleport username={username} />}
          {route === 3 && <Sound />}
          {route === 4 && <Message />}
          {route === 5 && <Save />}
        </div>
      </div>
    </div>
  );
};

export default Content;
