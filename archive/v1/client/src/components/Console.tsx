import { console } from 'console-events';
import { h } from 'preact';
import { useEffect } from 'preact/hooks';

interface ErrorType {
  arguments: string[];
}

const Console = ({ statement }: { statement: string }) => {
  useEffect(() => {
    console.addEventListener('log', (error: ErrorType) => {
      if (error.arguments.length > 0) {
        const developmentConsoleWindow = document.querySelector('#dev-console');
        const productionConsoleWindow = document.querySelector('#prod-console');
        if (
          developmentConsoleWindow &&
          productionConsoleWindow &&
          error.arguments.length > 0
        ) {
          for (let index = 0; index < error.arguments.length; index += 1) {
            const developmentStatement = `${JSON.stringify(
              error.arguments[index],
            )}\n`;
            const productionStatement = `${error.arguments[index]}\n`;
            developmentConsoleWindow.append(developmentStatement);
            developmentConsoleWindow.scroll({
              top: developmentConsoleWindow.scrollHeight,
              behavior: 'smooth',
            });
            productionConsoleWindow.append(productionStatement);
            productionConsoleWindow.scroll({
              top: productionConsoleWindow.scrollHeight,
              behavior: 'smooth',
            });
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    const developmentConsoleWindow = document.querySelector('#dev-console');
    const productionConsoleWindow = document.querySelector('#prod-console');
    developmentConsoleWindow?.scroll({
      top: developmentConsoleWindow.scrollHeight,
      behavior: 'smooth',
    });
    productionConsoleWindow?.scroll({
      top: productionConsoleWindow.scrollHeight,
      behavior: 'smooth',
    });
  });

  return (
    <div id="console">
      <div
        id="prod-console"
        style={statement === 'prod' ? '' : 'display: none'}
      />
      <div
        id="dev-console"
        style={statement === 'dev' ? '' : 'display: none'}
      />
    </div>
  );
};

export default Console;
