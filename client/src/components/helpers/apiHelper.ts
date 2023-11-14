import axios from 'axios';

const address = 'http://localhost:3000';

export const sendRewind = async (data: string) => {
  try {
    return await axios.post(`${address}/rewind`, { data });
  } catch (error) {
    console.error(error);
  }
};

export const sendSave = async () => {
  try {
    return await axios.post(`${address}/save`);
  } catch (error) {
    console.error(error);
  }
};

export const sendSfx = async (data: string) => {
  try {
    return await axios.post(`${address}/sfx`, { data });
  } catch (error) {
    console.error(error);
  }
};
