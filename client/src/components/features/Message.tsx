import { Button, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';

import { sendMessage } from '../helpers/apiHelper';

const handleMessage = async (text: string) => {
  await sendMessage(text);
};

const Message = () => {
  const [inputText, setInputText] = useState('');
  const textInputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = () => {
      if (textInputReference.current) {
        textInputReference.current.focus();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
