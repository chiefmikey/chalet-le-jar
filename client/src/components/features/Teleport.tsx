import React, { SyntheticEvent } from 'react';

import { locations, coordinates } from '../../constants';
import { sendTeleport } from '../helpers/apiHelper';

const Teleport = ({ username }: { username: string }) => {
  const handleTeleport = async (event: SyntheticEvent<HTMLButtonElement>) => {
    const location = (event.target as HTMLButtonElement).textContent;
    const key = Number(
      Object.keys(locations).find((key) => locations[Number(key)] === location),
    );
    const coordinate = coordinates[key];

    if (key !== undefined) {
      await sendTeleport({ username, coordinate });
    }
  };

  const buttons = [];
  for (const [key, value] of Object.entries(locations)) {
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
