import React, { SyntheticEvent } from 'react';

import { sendTeleport } from '../helpers/apiHelper';

const Teleport = ({ username }: { username: string }) => {
  const options = {
    0: 'CASTLE',
    1: 'MUSHROOM',
    2: 'PYRAMID',
    3: 'GUARDIAN',
    4: 'CREEPER',
  } as { [key: number]: string };
  const storedCoordinates = {
    0: '100 100 100',
    1: '200 200 200',
    2: '300 300 300',
    3: '400 400 400',
    4: '500 500 500',
  } as { [key: number]: string };

  const handleTeleport = async (event: SyntheticEvent<HTMLButtonElement>) => {
    const location = (event.target as HTMLButtonElement).textContent;
    const key = Object.keys(options).find(
      (key) => options[Number(key)] === location,
    );
    const coordinates = storedCoordinates[Number(key)];

    await sendTeleport({ username, coordinates });
  };

  const buttons = [];
  for (const [key, value] of Object.entries(options)) {
    buttons.push(
      <button
        key={key}
        className={`home-button home-button-${key}`}
        onClick={(event) => {
          handleTeleport(event).catch((error) => {
            console.error('Error teleporting:', error);
          });
        }}
      >
        <span>{value}</span>
      </button>,
    );
  }

  return <div className="home">{buttons}</div>;
};

export default Teleport;
