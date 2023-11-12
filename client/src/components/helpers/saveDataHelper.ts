import axios from 'axios';

const autosaveUrl =
  'https://raw.githubusercontent.com/chiefmikey/chalet-le-jar/log/log/autosave-log.txt';

const saveUrl =
  'https://raw.githubusercontent.com/chiefmikey/chalet-le-jar/log/log/save-log.txt';

export const fetchSaveData = async (resultsCap: number) => {
  const fetch = await axios.get(saveUrl);
  const log = fetch.data as string;
  const lines = log.split('\n').slice(0, resultsCap);
  const formattedLines = [];
  for (const raw of lines) {
    const formatted = raw.replace('_', ' ');
    const localDate = new Date(formatted).toLocaleString();
    const dateData = { raw, localDate };
    formattedLines.push(dateData);
  }
  return formattedLines;
};

export const fetchAutosaveData = async (resultsCap: number) => {
  const fetch = await axios.get(autosaveUrl);
  const log = fetch.data as string;
  const lines = log.split('\n').slice(0, resultsCap);
  const formattedLines = [];
  for (const raw of lines) {
    const formatted = raw.replace('_', ' ');
    const localDate = new Date(formatted).toLocaleString();
    const dateData = { raw, localDate };
    formattedLines.push(dateData);
  }
  return formattedLines;
};
