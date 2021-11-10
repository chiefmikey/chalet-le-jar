// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { console } from 'console-events';

const Console = ({ statement }) => {
  useEffect(() => {
    console.addEventListener('log', (e) => {
      if (e.arguments.length > 0) {
        const devConsoleWindow = document.getElementById('dev-console');
        const prodConsoleWindow = document.getElementById('prod-console');
        if (devConsoleWindow && prodConsoleWindow && e.arguments.length > 0) {
          for (let i = 0; i < e.arguments.length; i += 1) {
            const devStatement = `${JSON.stringify(e.arguments[i])}\n`;
            const prodStatement = `${e.arguments[i]}\n`;
            devConsoleWindow.append(devStatement);
            devConsoleWindow.scroll({
              top: devConsoleWindow.scrollHeight,
              behavior: 'smooth',
            });
            prodConsoleWindow.append(prodStatement);
            prodConsoleWindow.scroll({
              top: prodConsoleWindow.scrollHeight,
              behavior: 'smooth',
            });
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    const devConsoleWindow = document.getElementById('dev-console');
    const prodConsoleWindow = document.getElementById('prod-console');
    devConsoleWindow.scroll({
      top: devConsoleWindow.scrollHeight,
      behavior: 'smooth',
    });
    prodConsoleWindow.scroll({
      top: prodConsoleWindow.scrollHeight,
      behavior: 'smooth',
    });
  });

  return (
    <div id="console">
      <div
        id="prod-console"
        style={statement !== 'prod' && { display: 'none' }}
      />
      <div
        id="dev-console"
        style={statement !== 'dev' && { display: 'none' }}
      />
    </div>
  );
};

export default Console;
