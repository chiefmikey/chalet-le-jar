import { exec } from 'node:child_process';

const scripts = '/home/chalet-le-jar/scripts';

const shell = (command: string) => {
  const user = 'root';
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
  const command = `${scripts}/sever-rewind.sh "${date}"`;
  shell(command);
};

export const saveHelper = () => {
  const command = `${scripts}/server-save.sh`;
  shell(command);
};

export const sfxHelper = (sfx: string) => {
  const command = `${scripts}/server-sfx.sh "${sfx}"`;
  shell(command);
};

export const messageHelper = (message: string) => {
  const command = `${scripts}/server-message.sh "${message}"`;
  shell(command);
};

export const teleportHelper = (username: string, coordinate: string) => {
  const command = `${scripts}/server-teleport.sh "${username}" "${coordinate}"`;
  shell(command);
};

export const tickingHelper = (
  coordinate: string,
  radius: string,
  username: string,
) => {
  const command = `${scripts}/server-ticking.sh "${coordinate}" "${radius}" "${username}"`;
  shell(command);
};

export const clearTickingHelper = () => {
  const command = `${scripts}/server-ticking-clear.sh`;
  shell(command);
};
