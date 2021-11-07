import {
  SendCommandCommand,
  ListCommandInvocationsCommand,
} from '@aws-sdk/client-ssm';
import ssm from '../libs/ssmClient.js';

const setScript = (command, error, end, token) => {
  if (command === 'STOP') {
    return 'sudo /home/ubuntu/scripts/server-stop.sh';
  }
  if (command === 'REFRESH') {
    return 'sudo /home/ubuntu/scripts/server-refresh.sh';
  }
  if (command === 'SAVE') {
    return 'sudo /home/ubuntu/scripts/server-save.sh';
  }
  if (command === 'REWIND') {
    return 'sudo /home/ubuntu/scripts/server-rewind.sh';
  }
  console.log('Invalid command');
  end(command, token);
  return null;
};

let tries = 0;

const checkStatus = (launch, id, complete, error, end, command, token) => {
  const interval = setInterval(async () => {
    try {
      const input = {
        CommandId: id,
        InstanceId: 'i-06e517e42639034d6',
        Details: true,
      };
      const data = await launch.send(new ListCommandInvocationsCommand(input));
      console.log(`Checking command status...`);
      if (data) {
        console.log(
          `Status: ${data.CommandInvocations[0].Status}`,
          `Details: ${data.CommandInvocations[0].StatusDetails}`,
        );
        if (data.CommandInvocations[0].Status === 'Failed') {
          tries += 1;
          if (tries === 3) {
            console.log('Command failed...');
            clearInterval(interval);
            tries = 0;
            if (!end) {
              return error();
            }
            return end(command, token);
          }
        }
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
      end(command, token);
      return e;
    }
  }, 5000);
};

const sendCommand = async (command, launch, complete, error, end, token) => {
  try {
    const params = {
      DocumentName: 'AWS-RunShellScript',
      InstanceIds: ['i-06e517e42639034d6'],
      Comment: 'Sending shell script...',
      Parameters: {
        commands: [
          '#!/bin/bash',
          'cd /home/ubuntu',
          setScript(command, error, end, token),
        ],
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
    console.log('Error sending launch command', data);
    end(command, token);
    return null;
  } catch (e) {
    console.log('Error in send command', e);
    end(command, token);
    return e;
  }
};

const commands = async (command, token, complete, error, end = () => null) => {
  try {
    if (!token && process.env.NODE_ENV === 'production') {
      console.log('Token missing, please sign in');
      end(command, token);
      return null;
    }
    const launch = await ssm(token);
    if (launch) {
      return sendCommand(command, launch, complete, error, end, token);
    }
    console.log('Error in state', launch);
    end(command, token);
    return launch;
  } catch (e) {
    console.log('Error in ssm', e);
    end(command, token);
    return e;
  }
};

export default commands;
