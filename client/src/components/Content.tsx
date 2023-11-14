import {
  AppBar,
  Tabs,
  Tab,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState, SyntheticEvent } from 'react';

import Rewind from './features/Rewind';
import Save from './features/Save';

const Content = () => {
  const [value, setValue] = useState(0);
  const [subValue, setSubValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setValue(event.target.value as number);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
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
          value={value}
          onChange={handleChange}
          onOpen={handleOpen}
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
              backgroundColor: value === 0 ? '#437420' : '#5e853d',
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
              backgroundColor: value === 1 ? '#437420' : '#5e853d',
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
              backgroundColor: value === 2 ? '#437420' : '#5e853d',
              fontWeight: '600',
              fontSize: '3rem',
              height: '12vh',
            }}
          >
            SFX
          </MenuItem>
        </Select>
        {value === 0 && (
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
        {value === 0 && <Rewind subValue={subValue} />}
        {value === 1 && <Save />}
        {value === 2 && <div>SFX</div>}
      </div>
    </div>
  );
};

export default Content;
