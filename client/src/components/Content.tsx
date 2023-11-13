import { AppBar, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';

import Rewind from './features/Rewind';

const Content = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<object>, value: number) => {
    setValue(value);
  };

  return (
    <div className="content">
      <AppBar position="static">
        <Tabs
          TabIndicatorProps={{
            sx: { display: 'none' },
          }}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            backgroundColor: '#437420',
            borderRadius: '0',
            border: 'none',
            '.Mui-selected': {
              backgroundColor: '#8fcb5c',
            },
          }}
          classes={{
            root: 'tab-label',
          }}
        >
          <Tab
            className="tab-label"
            label="Rewind"
            sx={{
              height: '100%',
            }}
          />
          <Tab
            className="tab-label"
            label="SFX"
            sx={{
              height: '100%',
            }}
          />
        </Tabs>
      </AppBar>
      <div className="content-selection">
        {value === 0 && <Rewind />}
        {value === 1 && <div>Content for Option 2</div>}
      </div>
    </div>
  );
};

export default Content;
