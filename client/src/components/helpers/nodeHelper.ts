import { exec } from 'node:child_process';

const scripts = '/home/ec2-user';

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

export const restartClientHelper = () => {
  const command = `${scripts}/client.sh`;
  shell(command);
};
