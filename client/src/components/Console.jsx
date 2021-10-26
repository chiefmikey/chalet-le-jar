import { h } from 'preact';
import { console } from 'console-events';

console.addEventListener('log', (e) => {
  const consoleWindow = document.getElementById('console');
  consoleWindow.append(`${e.arguments[1]} :: `);
  consoleWindow.scroll({
    top: consoleWindow.scrollHeight,
    behavior: 'smooth',
  });
});

const Console = () => <div id="console" />;

export default Console;
