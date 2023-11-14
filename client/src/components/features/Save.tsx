import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { sendSave } from '../helpers/apiHelper';
import { fetchSaveData } from '../helpers/fetchDataHelper';

const handleSave = async () => {
  await sendSave();
};

const Save = () => {
  const resultsCap = { save: 72 };
  const [saveList, setSaveList] = useState([{ raw: '', localDate: '' }]);

  const fetchData = async () => {
    const fetchSaveList = await fetchSaveData(resultsCap.save);
    setSaveList(fetchSaveList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const buildList = (list: { raw: string; localDate: string }[]) => {
    if (list.length > 0) {
      return (
        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{
            width: '100%',
            maxHeight: '100vh',
            overflow: 'auto',
            padding: '0',
          }}
        >
          {list.map((item, index) => {
            const colorAlt = index % 2 === 0 ? '#9b6237' : '#5e361d';
            return (
              <ListItemButton
                key={item.raw}
                style={{
                  textAlign: 'center',
                  padding: '15px',
                  backgroundColor: colorAlt,
                }}
              >
                <ListItemText
                  primary={item.localDate}
                  classes={{
                    primary: 'rewind-list-item-text',
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      );
    }
  };

  const displayedList = buildList(saveList);

  return (
    <div className="rewind">
      <div className="rewind-selection">{displayedList}</div>

      <div className="rewind-button">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{
            width: '100%',
            height: '12vh',
            fontSize: '4rem',
            backgroundColor: '#c94712',
            fontWeight: 'bold',
            color: '#ffffff',
            borderRadius: '0',
            backgroundImage: '../../../public/assets/lava.gif',
          }}
        >
          SAVE
        </Button>
      </div>

      <div className="message">
        <span>{'PRESS SAVE'}</span>
      </div>
    </div>
  );
};

export default Save;
