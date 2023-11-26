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
  const command = `${scripts}/server-rewind.sh "${date}"`;
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

export const addTickingHelper = (
  coordinate: string,
  radius: string,
  locationName: string,
) => {
  const command = `${scripts}/server-ticking-add.sh "${coordinate}" "${radius}" "${locationName}"`;
  shell(command);
};

export const removeTickingHelper = (locationName: string) => {
  const command = `${scripts}/server-ticking-remove.sh "${locationName}"`;
  shell(command);
};

export const clearTickingHelper = () => {
  const command = `${scripts}/server-ticking-clear.sh`;
  shell(command);
};

export const resetTickingHelper = () => {
  const command = `${scripts}/server-ticking.sh`;
  shell(command);
};

export const resetServerHelper = () => {
  const command = `${scripts}/server-ts.sh`;
  shell(command);
};

export const upgradeServerHelper = () => {
  const command = `${scripts}/server-cycle.sh`;
  shell(command);
};
