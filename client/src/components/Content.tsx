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

import Rewind from './features/Rewind';
import Save from './features/Save';

const Content = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subValue, setSubValue] = useState(0);
  const [route, setRoute] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/home': {
        setRoute(0);
        break;
      }
      case '/save': {
        setRoute(1);
        break;
      }
      case '/sfx': {
        setRoute(2);
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
        navigate('/save');
        break;
      }
      case 2: {
        navigate('/sfx');
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

  return (
    <div className="content">
      <AppBar
        position="static"
        style={{
          alignItems: 'center',
        }}
      >
        <Select
          value={route}
          onChange={handleChange}
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
          <MenuItem
            value={0}
            style={{
              backgroundColor: route === 0 ? '#437420' : '#5e853d',
              fontWeight: '600',
              fontSize: '3rem',
              height: '12vh',
            }}
          >
            REWIND
          </MenuItem>
          <MenuItem
            value={1}
            style={{
              backgroundColor: route === 1 ? '#437420' : '#5e853d',
              fontWeight: '600',
              fontSize: '3rem',
              height: '12vh',
            }}
          >
            SAVE
          </MenuItem>
          <MenuItem
            value={2}
            style={{
              backgroundColor: route === 2 ? '#437420' : '#5e853d',
              fontWeight: '600',
              fontSize: '3rem',
              height: '12vh',
            }}
          >
            SFX
          </MenuItem>
        </Select>
        {route === 0 && (
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
      </AppBar>
      <div className="content-selection">
        {route === 0 && <Rewind subValue={subValue} />}
        {route === 1 && <Save />}
        {/* {value === 2 && <div>SFX</div>} */}
      </div>
    </div>
  );
};

export default Content;
