import axios from 'axios';

const url =
  'https://raw.githubusercontent.com/chiefmikey/chalet-le-jar/log/log/autosave-log.txt';

export const fetchAutosave = (index: number) =>
  axios.get(url).then((response) => {
    const lines = response.data.split('\n').slice(0, index);
  });
