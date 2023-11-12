import axios from 'axios';

const url =
  'https://raw.githubusercontent.com/chiefmikey/chalet-le-jar/log/log/autosave-log.txt';

export const fetchAutosave = async (index: number) => {
  const fetch = await axios.get(url);
  const log = fetch.data as string;
  const lines = log.split('\n').slice(0, index);
  return lines || [];
};
