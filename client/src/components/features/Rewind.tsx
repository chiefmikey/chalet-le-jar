import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';

import { sendRewind } from '../helpers/apiHelper';
import {
  fetchSaveData,
  fetchAutosaveData,
  fetchRewindData,
} from '../helpers/fetchDataHelper';

const Rewind = ({ subValue }: { subValue: number }) => {
  const resultsCap = { autosave: 72, save: 72, rewind: 1 };
  const [selectedItem, setSelectedItem] = useState(0);
  const [wasSelected, setWasSelected] = useState(false);
  const [saveList, setSaveList] = useState([{ raw: '', localDate: '' }]);
  const [autosaveList, setAutosaveList] = useState([
    { raw: '', localDate: 'Loading...' },
  ]);
  const [rewindList, setRewindList] = useState([{ raw: '', localDate: '' }]);

  const isAutosave = subValue === 0;
  const useList = isAutosave ? autosaveList : saveList;
  const saveType = isAutosave ? 'autosave' : 'save';

  const fetchData = useCallback(
    async (isAutosave: boolean) => {
      const fetchRewindList = await fetchRewindData(resultsCap.rewind);
      setRewindList(fetchRewindList);

      if (isAutosave) {
        const fetchAutosaveList = await fetchAutosaveData(resultsCap.autosave);
        setAutosaveList(fetchAutosaveList);
      } else {
        const fetchSaveList = await fetchSaveData(resultsCap.save);
        setSaveList(fetchSaveList);
      }
    },
    [resultsCap.autosave, resultsCap.rewind, resultsCap.save],
  );

  useEffect(() => {
    fetchData(isAutosave).catch((error: Error) => {
      console.error('Error fetching data:', error);
    });
  }, [isAutosave]);

  const handleListSelect = (index: number) => {
    setSelectedItem(index);
    setWasSelected(true);
  };

  const handleRewind = async () => {
    await sendRewind(`${saveType}/${useList[selectedItem].raw}`);
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
                key={item.raw}
                selected={listSelected}
                style={{
                  textAlign: 'center',
                  padding: '15px',
                  backgroundColor: listSelected ? '#2ac9b9' : colorAlt,
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

  const displayedList = buildList(useList);

  return (
    <div className="rewind">
      <div className="rewind-selection">{displayedList}</div>

      <div className="rewind-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleRewind().catch((error: Error) => {
              console.error('Error rewinding:', error);
            });
          }}
          disabled={selectedItem === undefined}
          style={{
            width: '100%',
            height: '10vh',
            fontSize: '3rem',
            backgroundColor: wasSelected ? '#c94712' : 'gray',
            fontWeight: 'bold',
            color: wasSelected ? '#ffffff' : 'lightgrey',
            borderRadius: '0',
            backgroundImage: '../../../public/assets/lava.gif',
          }}
        >
          REWIND
        </Button>
      </div>

      <div className="message">
        <span>{`Recent: ${rewindList[0]?.localDate || ''}`}</span>
      </div>
    </div>
  );
};

export default Rewind;
