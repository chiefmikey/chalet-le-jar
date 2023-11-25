import { useLogto } from '@logto/react';
import React, { SyntheticEvent } from 'react';

import { sendClearTicking } from '../helpers/apiHelper';
import { handleSignOut } from '../helpers/authHelper';

const handleClearTicking = async (event: SyntheticEvent<HTMLButtonElement>) => {
  await sendClearTicking();
};

const Settings = ({ username }: { username: string }) => {
  const { signOut } = useLogto();

  const buttons = [
    <button
      key={'sign-out'}
      className={`home-button home-button-1`}
      onClick={() => handleSignOut(signOut)}
    >
      <span>SIGN OUT</span>
    </button>,
  ];

  if (username === 'rotttttt') {
    buttons.push(
      <button
        key={'clear-ticking'}
        className={`home-button home-button-0`}
        onClick={(event) => {
          handleClearTicking(event).catch((error) => {
            console.error('Error clearing ticking:', error);
          });
        }}
      >
        <span>CLEAR TICKING</span>
      </button>,
    );
  }

  return <div className="home">{buttons}</div>;
};

export default Settings;
