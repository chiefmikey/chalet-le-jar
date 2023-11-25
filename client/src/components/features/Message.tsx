import { Button, TextField } from '@mui/material';
import React, { useState, useRef } from 'react';

import { sendMessage } from '../helpers/apiHelper';

const handleMessage = async (text: string) => {
  await sendMessage(text);
};

const Message = () => {
  const [inputText, setInputText] = useState('');
  const textInputReference = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (textInputReference.current) {
      textInputReference.current.focus();
    }
  };

  const textInput = (
    <TextField
      multiline
      maxRows={10}
      name="name"
      value={inputText}
      onChange={(event) => setInputText(event.target.value)}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        fontWeight: 'bold',
        color: '#000',
        border: 'none',
      }}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      inputRef={textInputReference}
      inputProps={{
        style: {
          fontSize: '2rem',
        },
      }}
      onClick={handleClick}
    />
  );

  return (
    <div className="rewind">
      <div className="rewind-selection">{textInput}</div>

      <div className="rewind-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('inputText:', inputText);
            handleMessage(inputText)
              .then(() => {
                setInputText('');
              })
              .catch((error: Error) => {
                console.error('Error sending message:', error);
              });
          }}
          disabled={!inputText}
          style={{
            width: '100%',
            height: '12vh',
            fontSize: '3rem',
            backgroundColor: inputText ? '#c94712' : 'gray',
            fontWeight: 'bold',
            color: inputText ? '#ffffff' : 'lightgrey',
            borderRadius: '0',
            backgroundImage: '../../../public/assets/lava.gif',
          }}
        >
          SEND
        </Button>
      </div>

      <div className="message">
        <span>DISPLAY A MESSAGE</span>
      </div>
    </div>
  );
};

export default Message;
