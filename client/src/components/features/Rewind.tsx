import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import { sendRequest } from '../helpers/apiHelper';
import {
  fetchSaveData,
  fetchAutosaveData,
  fetchRewindData,
} from '../helpers/fetchDataHelper';

const Rewind = ({ subValue }) => {
  const resultsCap = { autosave: 72, save: 72, rewind: 1 };
  const [selectedItem, setSelectedItem] = useState(
    undefined as undefined | number,
  );
  const [saveList, setSaveList] = useState([{ raw: '', localDate: '' }]);
  const [message, setMessage] = useState('');
  const [autosaveList, setAutosaveList] = useState([
    { raw: '', localDate: 'Loading...' },
  ]);
  const [rewindList, setRewindList] = useState([{ raw: '', localDate: '' }]);

  const fetchData = async () => {
    const fetchSaveList = await fetchSaveData(resultsCap.save);
    const fetchAutosaveList = await fetchAutosaveData(resultsCap.autosave);
    const fetchRewindList = await fetchRewindData(resultsCap.rewind);
    setSaveList(fetchSaveList);
    setAutosaveList(fetchAutosaveList);
    setRewindList(fetchRewindList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendRewind = async () => {
    const response = (await sendRequest({
      type: 'rewind',
      data: selectedItem,
    })) as AxiosResponse;
    if (response.status === 200) {
      setMessage('Rewind Successful');
    }
  };

  const useList = subValue === 0 ? autosaveList : saveList;
  const displayListKey = subValue === 0 ? 'autosaveList' : 'saveList';

  const buildList = (list: { raw: string; localDate: string }[]) => {
    if (list.length > 0) {
      return (
        <List
          component="nav"
          key={displayListKey}
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
                onClick={(event) => setSelectedItem(index)}
                key={item.raw}
                selected={selectedItem === index}
                style={{
                  textAlign: 'center',
                  padding: '15px',
                  backgroundColor:
                    selectedItem === index ? '#2ac9b9' : colorAlt,
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
  const isSelected = selectedItem !== undefined;

  return (
    <div className="rewind">
      <div className="rewind-selection">{displayedList}</div>

      <div className="rewind-button">
        <Button
          variant="contained"
          color="primary"
          onClick={sendRewind}
          disabled={!selectedItem}
          style={{
            width: '100%',
            height: '12vh',
            fontSize: '2rem',
            backgroundColor: isSelected ? '#c94712' : 'gray',
            fontWeight: 'bold',
            color: isSelected ? '#ffffff' : 'lightgrey',
            borderRadius: '0',
            backgroundImage: '../../../public/assets/lava.gif',
          }}
        >
          Rewind
        </Button>
      </div>

      <div className="message">
        <span>{`Recent: ${rewindList[0].localDate}`}</span>
      </div>
    </div>
  );
};

export default Rewind;
