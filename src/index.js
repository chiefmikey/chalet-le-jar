import axios from 'axios';
import './styles.css';

const test = async () => {
  try {
    const app = document.getElementById('app');
    app.innerHTML = 'Loading...';
    app.style.backgroundColor = '#000000';
    const res = await axios.get('https://api.github.com/users/chiefmikey');
    return app.appendChild(document.createTextNode(`${res.data}`));
  } catch (e) {
    return e;
  }
};

test();

const app = document.getElementById('app');
app.innerHTML = 'Loading...';
app.style.backgroundColor = '#000000';
app.appendChild(document.createTextNode('Hello World'));
