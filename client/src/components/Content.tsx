import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';

import Rewind from './features/Rewind';

const Content = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<object>, value: number) => {
    setValue(value);
  };

  return (
    <div className="content">
      <span className="content-title">A Simply Dark Theme</span>
      <div className="content-selection">
        <AppBar position="static">
          <Toolbar
            sx={{
              backgroundColor: 'lightgray',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{ backgroundColor: 'lightgray', borderRadius: '8px' }}
            >
              <Tab className="tab-label" label="Rewind" />
              <Tab className="tab-label" label="SFX" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
      {value === 0 && <Rewind />}
      {value === 1 && <div>Content for Option 2</div>}
    </div>
  );
};

export default Content;
