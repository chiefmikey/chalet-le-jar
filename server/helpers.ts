import { exec } from 'node:child_process';

const user = 'chalet-le-jar';

const shell = (command: string) => {
  exec(`sudo -u ${user} ${command}`, (error, stdout, stderr) => {
    let outputError = '';
    if (error) {
      outputError = `error: ${error.message}`;
      console.log(outputError);
      return outputError;
    }
    if (stderr) {
      outputError = `stderr: ${stderr}`;
      console.log(outputError);
      return outputError;
    }
    const output = `stdout: ${stdout}`;
    console.log(output);
    return output;
  });
};

export const rewindHelper = (date: string) => {
  const command = `rewind ${date}`;
  shell(command);
};

export const saveHelper = () => {
  const command = 'save';
  shell(command);
};

export const sfxHelper = (sfx: string) => {
  const command = `sfx ${sfx}`;
  shell(command);
};

export const messageHelper = (message: string) => {
  const command = `message ${message}`;
  shell(command);
};

export const teleportHelper = (username: string, coordinates: string) => {
  const command = `teleport ${username} ${coordinates}`;
  shell(command);
};
