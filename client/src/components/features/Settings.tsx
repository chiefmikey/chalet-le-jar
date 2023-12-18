import { useLogto } from '@logto/react';
import React, { SyntheticEvent } from 'react';

import { version } from '../../../package';
import Footer from '../Footer';
import {
  sendClearTicking,
  sendResetTicking,
  sendResetClient,
  sendResetServer,
  sendUpgradeServer,
} from '../helpers/apiHelper';
import { handleSignOut } from '../helpers/authHelper';

const handleResetTicking = async (event: SyntheticEvent<HTMLButtonElement>) => {
  await sendClearTicking();
  await sendResetTicking();
};

const handleResetClient = (event: SyntheticEvent<HTMLButtonElement>) => {
  sendResetClient();
};

const handleResetServer = async (event: SyntheticEvent<HTMLButtonElement>) => {
  await sendResetServer();
};

const handleUpgradeServer = async (
  event: SyntheticEvent<HTMLButtonElement>,
) => {
  await sendUpgradeServer();
};

const Settings = ({
  username,
  activePlayerCount,
}: {
  username: string;
  activePlayerCount: number;
}) => {
  const { signOut } = useLogto();

  const buttons = [
    <button
      key={'sign-out'}
      className={'home-button'}
      onClick={() => handleSignOut(signOut)}
    >
      <span>SIGN OUT</span>
    </button>,
  ];

  if (username === 'rotttttt') {
    buttons.push(
      <button
        key={'reset-ticking'}
        className={'home-button'}
        onClick={(event) => {
          handleResetTicking(event).catch((error) => {
            console.error('Error resetting ticking:', error);
          });
        }}
      >
        <span>RESET TICKING</span>
      </button>,
      <button
        key={'reset-client'}
        className={'home-button'}
        onClick={(event) => {
          handleResetClient(event);
        }}
      >
        <span>RESET CLIENT</span>
      </button>,
      <button
        key={'reset-server'}
        className={'home-button'}
        onClick={(event) => {
          handleResetServer(event).catch((error) => {
            console.error('Error resetting server:', error);
          });
        }}
      >
        <span>RESET SERVER</span>
      </button>,
      <button
        key={'upgrade-server'}
        className={'home-button'}
        onClick={(event) => {
          handleUpgradeServer(event).catch((error) => {
            console.error('Error upgrading server:', error);
          });
        }}
      >
        <span>UPGRADE SERVER</span>
      </button>,
    );
  }

  return (
    <div className="home">
      {buttons}
      <Footer
        footerValue={`Client Version ${version}`}
        activePlayerCount={activePlayerCount}
      />
    </div>
  );
};

export default Settings;
