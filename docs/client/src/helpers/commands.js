import {
  SendCommandCommand,
  ListCommandInvocationsCommand,
} from '@aws-sdk/client-ssm';
import ssm from '../libs/ssmClient.js';

const setScript = (
  command,
  error,
  end,
  token,
  selectedBranch,
  latestBranch,
) => {
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
    console.log(`Loading save ${selectedBranch}`);
    return `branch=${selectedBranch} /home/ubuntu/scripts/server-rewind.sh`;
  }
  if (command === 'START') {
    console.log(`Loading save ${latestBranch}`);
    return `latest=${latestBranch} /home/ubuntu/scripts/server-start.sh`;
  }
  console.log('Invalid command');
  return end(command, token);
};

const finish = (command, token, end, complete) => {
  console.log('Commands executed successfully');
  if (!end) {
    return complete();
  }
  return end(command, token);
};

let tries = 0;

const checkStatus = (launch, id, complete, error, end, command, token) => {
  const interval = setInterval(async () => {
    try {
      const input = {
        CommandId: id,
        InstanceId: 'i-0c35872f8d010202c',
        Details: true,
      };
      const data = await launch.send(new ListCommandInvocationsCommand(input));
      console.log(`Checking command status...`);
      if (data) {
        console.log(`Status: ${data.CommandInvocations[0].Status}`);
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
          clearInterval(interval);
          return finish(command, token, end, complete);
        }
      }
      return data;
    } catch (error_) {
      console.log('Error checking command status', error_);
      clearInterval(interval);
      error();
      return error_;
    }
  }, 5000);
};

let checkInterval;

const checkSend = (
  command,
  launch,
  complete,
  error,
  end,
  token,
  selectedBranch,
  latestBranch,
) => {
  checkInterval = setInterval(async () => {
    sendCommand(
      command,
      launch,
      complete,
      error,
      end,
      token,
      selectedBranch,
      latestBranch,
    );
  }, 10_000);
};

let trySend = 0;

const sendCommand = async (
  command,
  launch,
  complete,
  error,
  end,
  token,
  selectedBranch,
  latestBranch,
) => {
  try {
    const parameters = {
      DocumentName: 'AWS-RunShellScript',
      InstanceIds: ['i-0c35872f8d010202c'],
      Comment: 'Sending shell script...',
      Parameters: {
        commands: [
          '#!/bin/bash',
          'cd /home/ubuntu',
          setScript(command, error, end, token, selectedBranch, latestBranch),
        ],
      },
    };
    if (trySend === 0) {
      console.log(`${command} command sent`);
    }
    const data = await launch.send(new SendCommandCommand(parameters));
    if (data) {
      clearInterval(checkInterval);
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
    error(command, token);
    return data;
  } catch (error_) {
    if (trySend === 3) {
      trySend = 0;
      console.log('Error in send command', error_);
      clearInterval(checkInterval);
      error(command, token);
      return error_;
    }
    if (trySend === 0) {
      console.log('First attempt failed', 'Retrying...');
      checkSend(
        command,
        launch,
        complete,
        error,
        end,
        token,
        selectedBranch,
        latestBranch,
      );
    } else {
      console.log('Retrying...');
    }
    return (trySend += 1);
  }
};

const commands = async (
  command,
  token,
  complete,
  error,
  end,
  selectedBranch,
  latestBranch,
) => {
  try {
    if (!token && process.env.NODE_ENV === 'production') {
      console.log('Token missing, please sign in');
      return error(command, token);
    }
    const launch = await ssm(token);
    if (launch) {
      return sendCommand(
        command,
        launch,
        complete,
        error,
        end,
        token,
        selectedBranch,
        latestBranch,
      );
    }
    console.log('Error in state', launch);
    error(command, token);
    return launch;
  } catch (error_) {
    console.log('Error in ssm', error_);
    error(command, token);
    return error_;
  }
};

export default commands;
