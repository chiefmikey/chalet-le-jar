import { List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { sendRequest } from '../helpers/apiHelper';
import { fetchSaveData, fetchAutosaveData } from '../helpers/fetchDataHelper';

const Rewind = () => {
  const resultsCap = { autosave: 72, save: 72 };
  const [selectedItem, setSelectedItem] = useState(0);
  const [saveList, setSaveList] = useState([{ raw: '', localDate: '' }]);
  const [autosaveList, setAutosaveList] = useState([
    { raw: '', localDate: '' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchSaveList = await fetchSaveData(resultsCap.save);
      const fetchAutosaveList = await fetchAutosaveData(resultsCap.autosave);
      setSaveList(fetchSaveList);
      setAutosaveList(fetchAutosaveList);
    };
    fetchData();
  }, []);

  const sendRewind = async (rawDate) => {
    const response = await sendRequest;
  };

  return (
    <div className="rewind">
      <span className="rewind-title">Rewind</span>
      <div className="rewind-selection">
        <List component="nav" aria-label="main mailbox folders">
          {saveList.length > 0 &&
            saveList.map((item, index) => (
              <ListItem
                onClick={(event) => setSelectedItem(index)}
                key={item.raw}
              >
                <ListItemText primary={item.localDate} />
              </ListItem>
            ))}
        </List>
        <List component="nav" aria-label="main mailbox folders">
          {autosaveList.length > 0 &&
            autosaveList.map((item, index) => (
              <ListItem
                onClick={(event) => setSelectedItem(index)}
                key={item.raw}
              >
                <ListItemText primary={item.localDate} />
              </ListItem>
            ))}
        </List>
        {selectedItem !== null && (
          <div>Selected item: {autosaveList[selectedItem].localDate}</div>
        )}
      </div>
    </div>
  );
};

export default Rewind;
