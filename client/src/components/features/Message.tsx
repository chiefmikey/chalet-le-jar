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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default action to avoid a page refresh
      handleMessage(inputText)
        .then(() => {
          setInputText('');
        })
        .catch((error: Error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  const textInput = (
    <TextField
      multiline
      maxRows={10}
      name="name"
      value={inputText}
      onChange={(event) => setInputText(event.target.value)}
      onKeyDown={handleKeyPress}
      style={{
        width: '100%',
        backgroundColor: '#fff',
        fontWeight: 'bold',
        color: '#000',
        border: 'none',
        padding: '0 0 20rem 0',
      }}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      inputRef={textInputReference}
      inputProps={{
        style: {
          fontSize: '4rem',
          lineHeight: '8rem',
          backgroundColor: '#fff',
          width: '100%',
          padding: '0 0 20rem 0',
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
            height: '10vh',
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
