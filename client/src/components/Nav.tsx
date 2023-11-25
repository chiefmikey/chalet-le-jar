import {
  AppBar,
  Tabs,
  Tab,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState, SyntheticEvent, useEffect } from 'react';

import { users, menuOptions } from '../constants';

const Nav = ({
  route,
  rewindTabValue,
  setRewindTabValue,
  username,
  handleChange,
}: {
  route: number;
  rewindTabValue: number;
  setRewindTabValue: (value: number) => void;
  username: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
}) => {
  const [teleportUserValue, setTeleportUserValue] = useState(0);

  useEffect(() => {
    if (route === 2) {
      setTeleportUserValue(users.indexOf(username));
    }
  }, []);

  const menuItems = [];
  for (const value of Object.keys(menuOptions)) {
    const numberValue = Number(value);
    const label = menuOptions[numberValue];

    menuItems.push(
      <MenuItem
        value={numberValue}
        key={numberValue}
        style={{
          backgroundColor: route === numberValue ? '#437420' : '#7db04f',
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
          backgroundColor:
            teleportUserValue === userValue ? '#437420' : '#7db04f',
          fontWeight: '600',
          fontSize: '3rem',
          height: '12vh',
        }}
      >
        {label}
      </MenuItem>,
    );
  }

  const handleRewindTabChange = (
    event_: SyntheticEvent<Element, Event>,
    value: number,
  ) => {
    setRewindTabValue(value);
  };

  const handleTeleportUserChange = (event: SelectChangeEvent<string>) => {
    setTeleportUserValue(Number(event.target.value));
  };

  return (
    <div className="nav">
      <AppBar
        position="static"
        style={{
          alignItems: 'center',
        }}
      >
        <Select
          value={String(route)}
          onChange={handleChange}
          displayEmpty
          renderValue={() => {
            if (route === 0) {
              return '⇩';
            }
            return menuOptions[route];
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
            height: '9vh',
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
            value={rewindTabValue}
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
            onChange={handleRewindTabChange}
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
                backgroundColor: rewindTabValue === 0 ? '#7db04f' : '#437420',
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
                backgroundColor: rewindTabValue === 0 ? '#437420' : '#7db04f',
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
            value={String(teleportUserValue)}
            onChange={handleTeleportUserChange}
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
              backgroundColor: '#437420',
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
  );
};

export default Nav;
