import axios, { AxiosResponse } from 'axios';

const logRootUrl =
  'https://raw.githubusercontent.com/chiefmikey/chalet-le-jar/log/log';

const urls = {
  autosave: `${logRootUrl}/autosave-log.txt`,
  save: `${logRootUrl}/save-log.txt`,
  rewind: `${logRootUrl}/rewind-log.txt`,
};

const formatData = (fetch: AxiosResponse, resultsCap: number) => {
  const log = fetch.data as string;
  if (log) {
    const lines = log.split('\n').slice(0, resultsCap);
    const formattedLines = [];
    for (const raw of lines) {
      const formatted = raw.replace('_', ' ');
      const localDate = new Date(formatted).toLocaleString();
      const dateData = { raw, localDate };
      formattedLines.push(dateData);
    }
    return formattedLines;
  }
  return [];
};

export const fetchSaveData = async (resultsCap: number) => {
  const fetch = await axios.get(urls.save);
  return formatData(fetch, resultsCap);
};

export const fetchAutosaveData = async (resultsCap: number) => {
  const fetch = await axios.get(urls.autosave);
  return formatData(fetch, resultsCap);
};

export const fetchRewindData = async (resultsCap: number) => {
  const fetch = await axios.get(urls.rewind);
  return formatData(fetch, resultsCap);
};
