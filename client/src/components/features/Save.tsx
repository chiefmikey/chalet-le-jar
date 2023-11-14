// static list of saves. bottom button saves at current time. timeout to recheck log every x seconds to confirm save. could apply to all lists maybe a slower schedule

import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { sendSave } from '../helpers/apiHelper';
import { fetchSaveData } from '../helpers/fetchDataHelper';

const handleSave = async () => {
  await sendSave();
};

const Save = () => {
  const resultsCap = { save: 72 };
  const [selectedItem, setSelectedItem] = useState(0);
  const [wasSelected, setWasSelected] = useState(false);
  const [saveList, setSaveList] = useState([{ raw: '', localDate: '' }]);

  const fetchData = async () => {
    const fetchSaveList = await fetchSaveData(resultsCap.save);
    setSaveList(fetchSaveList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleListSelect = (index: number) => {
    setSelectedItem(index);
    setWasSelected(true);
  };

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
          disabled={!selectedItem}
          style={{
            width: '100%',
            height: '12vh',
            fontSize: '4rem',
            backgroundColor: wasSelected ? '#c94712' : 'gray',
            fontWeight: 'bold',
            color: wasSelected ? '#ffffff' : 'lightgrey',
            borderRadius: '0',
            backgroundImage: '../../../public/assets/lava.gif',
          }}
        >
          SAVE
        </Button>
      </div>

      <div className="message">
        <span>{'PRESS SAVE TO SAVE OK'}</span>
      </div>
    </div>
  );
};

export default Save;
