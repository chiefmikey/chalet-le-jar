import { List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { fetchAutosave } from './helpers/autosaveHelper';

const Rewind = () => {
  const index = 30;
  const [selectedItem, setSelectedItem] = useState(0);
  const [autosaveList, setAutosaveList] = useState([
    { raw: '', localDate: '' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await fetchAutosave(index);
      setAutosaveList(list);
    };
    fetchData();
  }, []);

  return (
    <div className="rewind">
      <span className="rewind-title">Rewind</span>
      <div className="rewind-selection">
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
