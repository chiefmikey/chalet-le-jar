import { h } from 'preact';
import { console } from 'console-events';

console.addEventListener('log', (e) => {
  let newline = '/';
  const consoleWindow = document.getElementById('console');
  if (e.arguments.length > 0) {
    for (let i = 0; i < e.arguments.length; i += 1) {
      consoleWindow.append(`${e.arguments[i]} `);
      for (let j = e.arguments[i].length; j < 97; j += 1) {
        newline += '-';
      }
      newline += '/ ';
      consoleWindow.append(newline);
      newline = '/';
      consoleWindow.scroll({
        top: consoleWindow.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
});

const Console = () => <div id="console" />;

export default Console;
