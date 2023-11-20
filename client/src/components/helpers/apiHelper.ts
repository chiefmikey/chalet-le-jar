import axios from 'axios';

const address = 'ip.chaletlejar.com:3004';

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

export const sendMessage = async (data: string) => {
  try {
    return await axios.post(`${address}/message`, { data });
  } catch (error) {
    console.error(error);
  }
};

export const sendTeleport = async (data: {
  username: string;
  coordinates: string;
}) => {
  try {
    return await axios.post(`${address}/teleport`, { data });
  } catch (error) {
    console.error(error);
  }
};
