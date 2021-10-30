import { h } from 'preact';
import { console } from 'console-events';

const Console = () => {
  console.addEventListener('log', (e) => {
    let newline = '/';
    const consoleWindow = document.getElementById('console');
    if (consoleWindow && e.arguments.length > 0) {
      for (let i = 0; i < e.arguments.length; i += 1) {
        const statement = `${JSON.stringify(e.arguments[i])} `;
        consoleWindow.append(statement);
        for (let j = statement.length; j < 80; j += 1) {
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
  return <div id="console" />;
};

export default Console;
