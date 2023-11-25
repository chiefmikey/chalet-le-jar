import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';

import { sendSfx } from '../helpers/apiHelper';
import { fetchSfxData } from '../helpers/fetchDataHelper';

const Sound = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [wasSelected, setWasSelected] = useState(false);
  const [sfxList, setSfxList] = useState([] as string[]);

  const fetchData = useCallback(async () => {
    const fetchSfxList = await fetchSfxData();
    setSfxList(fetchSfxList);
  }, []);

  useEffect(() => {
    fetchData().catch((error: Error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const handleListSelect = (index: number) => {
    setSelectedItem(index);
    setWasSelected(true);
  };

  const handleSfx = async () => {
    await sendSfx(sfxList[selectedItem]);
  };

  const buildList = (list: string[]) => {
    if (list.length > 0) {
      return (
        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{
            width: '100%',
            maxHeight: '100vh',
            overflowY: 'scroll',
            overflowX: 'hidden',
            padding: '0',
          }}
        >
          {list.map((item, index) => {
            const listSelected = wasSelected && selectedItem === index;
            const colorAlt = index % 2 === 0 ? '#9b6237' : '#5e361d';
            return (
              <ListItemButton
                onClick={(event) => handleListSelect(index)}
                key={item}
                selected={listSelected}
                style={{
                  textAlign: 'center',
                  padding: '15px',
                  backgroundColor: listSelected ? '#2ac9b9' : colorAlt,
                }}
              >
                <ListItemText
                  primary={item}
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

  const displayedList = buildList(sfxList);

  return (
    <div className="rewind">
      <div className="rewind-selection">{displayedList}</div>

      <div className="rewind-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSfx().catch((error: Error) => {
              console.error('Error playing sfx:', error);
            });
          }}
          disabled={selectedItem === undefined}
          style={{
            width: '100%',
            height: '10vh',
            fontSize: '3rem',
            backgroundColor: wasSelected ? '#c94712' : 'gray',
            fontWeight: 'bold',
            color: wasSelected ? '#fff' : 'lightgrey',
            borderRadius: '0',
            backgroundImage: '../../../public/assets/lava.gif',
          }}
        >
          PLAY
        </Button>
      </div>

      <div className="message">
        <span>BARK LIKE A DOG</span>
      </div>
    </div>
  );
};

export default Sound;
