import {
  SendCommandCommand,
  ListCommandInvocationsCommand,
} from '@aws-sdk/client-ssm';
import ssm from '../libs/ssmClient.js';

const setScript = (command, error) => {
  if (command === 'START') {
    return 'sudo ~/scripts/server-start.sh';
  }
  if (command === 'STOP') {
    return 'sudo ~/scripts/server-stop.sh';
  }
  if (command === 'REFRESH') {
    return 'sudo ~/scripts/server-refresh.sh';
  }
  if (command === 'SAVE') {
    return 'sudo ~/scripts/server-save.sh';
  }
  if (command === 'REWIND') {
    return 'sudo ~/scripts/server-rewind.sh';
  }
  console.log('Invalid command');
  error();
  return null;
};

const checkStatus = (launch, id, complete, error, end, command, token) => {
  const interval = setInterval(async () => {
    try {
      const input = {
        CommandId: id,
        InstanceId: 'i-0ca1ce46c83788324',
        Details: true,
      };
      const data = await launch.send(new ListCommandInvocationsCommand(input));
      console.log(`Checking command status...`);
      if (data) {
        console.log(
          `Status: ${data.CommandInvocations[0].Status}`,
          `Details: ${data.CommandInvocations[0].StatusDetails}`,
        );
        if (data.CommandInvocations[0].Status === 'Success') {
          console.log('Command executed successfully');
          clearInterval(interval);
          if (!end) {
            return complete();
          }
          return end(command, token);
        }
      }
      return null;
    } catch (e) {
      console.log('Error checking command status', e);
      clearInterval(interval);
      error();
      return e;
    }
  }, 5000);
};

const sendCommand = async (command, launch, complete, error, end, token) => {
  try {
    const params = {
      DocumentName: 'AWS-RunShellScript',
      InstanceIds: ['i-0ca1ce46c83788324'],
      Comment: 'Sending shell script...',
      Parameters: {
        commands: setScript(command, error),
      },
    };
    const data = await launch.send(new SendCommandCommand(params));
    console.log(`${command} command sent`);
    if (data) {
      return checkStatus(
        launch,
        data.Command.CommandId,
        complete,
        error,
        end,
        command,
        token,
      );
    }
    console.log('Error sending command', data);
    error();
    return null;
  } catch (e) {
    console.log('Error sending command', e);
    error();
    return e;
  }
};

const commands = async (command, token, complete, error, end = () => null) => {
  try {
    if (!token && process.env.NODE_ENV === 'production') {
      console.log('Token missing, please sign in');
      error();
      return null;
    }
    const launch = await ssm(token);
    if (launch) {
      return sendCommand(command, launch, complete, error, end, token);
    }
    console.log('Error in state', launch);
    error();
    return launch;
  } catch (e) {
    console.log('Error in ssm', e);
    error();
    return e;
  }
};

export default commands;
