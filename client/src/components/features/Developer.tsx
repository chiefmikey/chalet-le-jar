// list select and execute like all others. list provides dev options for start stop refresh upgrade, maybe with input for manual version change.

import { useLogto } from '@logto/react';
import React, { SyntheticEvent } from 'react';

import { clearTicking } from '../helpers/apiHelper';

const handleClearTicking = async (event: SyntheticEvent<HTMLButtonElement>) => {
  await clearTicking();
};

const Developer = ({ username }: { username: string }) => {
  const { signOut } = useLogto();

  const buttons = [];
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
    <button
      key={'sign-out'}
      className={`home-button home-button-1`}
      onClick={() => signOut('https://chaletlejar.com')}
    >
      <span>SIGN OUT</span>
    </button>,
  );

  return <div className="home">{buttons}</div>;
};

export default Developer;
