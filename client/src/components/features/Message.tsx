import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

import { sendMessage } from '../helpers/apiHelper';

const handleMessage = async (text: string) => {
  await sendMessage(text);
};

const Message = () => {
  const [inputText, setInputText] = useState('');

  const textInput = (
    <TextField
      type="text"
      name="name"
      value={inputText}
      onChange={(event) => setInputText(event.target.value)}
    />
  );

  return (
    <div className="rewind">
      <div className="rewind-selection">{textInput}</div>

      <div className="rewind-button">
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            handleMessage(event.currentTarget.value).catch((error: Error) => {
              console.error('Error sending message:', error);
            });
          }}
          disabled={!inputText}
          style={{
            width: '100%',
            height: '12vh',
            fontSize: '4rem',
            backgroundColor: inputText ? '#c94712' : 'gray',
            fontWeight: 'bold',
            color: inputText ? '#ffffff' : 'lightgrey',
            borderRadius: '0',
            backgroundImage: '../../../public/assets/lava.gif',
          }}
        >
          PLAY
        </Button>
      </div>

      <div className="message">
        <span>SING MY CHILD</span>
      </div>
    </div>
  );
};

export default Message;
