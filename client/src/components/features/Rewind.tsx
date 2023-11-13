import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import { sendRequest } from '../helpers/apiHelper';
import { fetchSaveData, fetchAutosaveData } from '../helpers/fetchDataHelper';

const Rewind = () => {
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
    const fetchRewindList = await fetchAutosaveData(resultsCap.rewind);
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

  const displayLists = [saveList, autosaveList];
  const displayListsKeys = ['saveList', 'autosaveList'];

  const displayedLists = displayLists.map((list, index) => {
    if (list.length > 0) {
      return (
        <List
          component="nav"
          key={displayListsKeys[index]}
          aria-label="main mailbox folders"
          style={{
            width: '100%',
            maxHeight: '100vh',
            overflow: 'auto',
            padding: '0',
          }}
        >
          {list.map((item, index) => (
            <ListItemButton
              onClick={(event) => setSelectedItem(index)}
              key={item.raw}
              selected={selectedItem === index}
              style={{
                textAlign: 'center',
                padding: '15px',
                backgroundColor: index % 2 === 0 ? '#9b6237' : '#5e361d',
              }}
            >
              <ListItemText
                primary={item.localDate}
                classes={{
                  primary: 'rewind-list-item-text',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      );
    }
  });

  return (
    <div className="rewind">
      <div className="rewind-selection">{displayedLists}</div>

      <div className="rewind-button">
        <Button
          variant="contained"
          color="primary"
          onClick={sendRewind}
          disabled={!selectedItem}
          style={{
            width: '100%',
            height: '10vh',
            fontSize: '2rem',
            backgroundColor: selectedItem ? '#c94712' : '#565352',
            fontWeight: 'bold',
            color: '#ffffff',
            borderRadius: '0',
            border: selectedItem ? '10px solid #565352' : '10px solid #c94712',
          }}
        >
          {selectedItem ? 'Rewind' : 'Select Date'}
        </Button>
      </div>

      {message && (
        <div className="message">
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Rewind;
