import axios from 'axios';

export const sendRequest = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000', { data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// post rewind with save/autosave and date

// post save no data needed

// post sfx with raw name string

// dev