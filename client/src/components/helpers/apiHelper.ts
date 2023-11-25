import axios from 'axios';

import { restartClientHelper } from './nodeHelper';

const address = 'https://ip.chaletlejar.com:3004';

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
  coordinate: string;
}) => {
  try {
    return await axios.post(`${address}/teleport`, { data });
  } catch (error) {
    console.error(error);
  }
};

export const sendAddTicking = async (data: {
  coordinate: string;
  radius: string;
  locationName: string;
}) => {
  try {
    return await axios.post(`${address}/addticking`, { data });
  } catch (error) {
    console.error(error);
  }
};

export const sendRemoveTicking = async (data: { locationName: string }) => {
  try {
    return await axios.post(`${address}/removeticking`, { data });
  } catch (error) {
    console.error(error);
  }
};

export const sendClearTicking = async () => {
  try {
    return await axios.post(`${address}/clearticking`);
  } catch (error) {
    console.error(error);
  }
};

export const sendResetTicking = async () => {
  try {
    return await axios.post(`${address}/resetticking`);
  } catch (error) {
    console.error(error);
  }
};

export const sendResetServer = async () => {
  try {
    return await axios.post(`${address}/resetserver`);
  } catch (error) {
    console.error(error);
  }
};

export const sendResetClient = () => {
  restartClientHelper();
};

export const sendUpgradeServer = async () => {
  try {
    return await axios.post(`${address}/upgradeserver`);
  } catch (error) {
    console.error(error);
  }
};
