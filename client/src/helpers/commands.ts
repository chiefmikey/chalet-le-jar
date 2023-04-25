import {
  ListCommandInvocationsCommand,
  SendCommandCommand,
} from '@aws-sdk/client-ssm';

import environment from '../environment';
import ssm from '../libs/ssmClient';

let tries = 0;
let trySend = 0;

const setScript = (
  command: string,
  error,
  end: boolean,
  token: string,
  selectedBranch: string,
  latestBranch: string,
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
    if (trySend === 0) {
      console.log(`Loading save ${selectedBranch}`);
    }
    return `BRANCH=${selectedBranch} /home/ubuntu/scripts/server-rewind.sh`;
  }
  if (command === 'START') {
    // if (trySend === 0) {
    //   console.log(`Loading save ${latestBranch}`);
    // }
    return `latest=${latestBranch} /home/ubuntu/scripts/server-start.sh`;
  }
  console.log('Invalid command');
  end(command, token);
};

const finish = (command: string, token: string, end, complete) => {
  if (end) {
    end(command, token);
  } else {
    complete();
  }
};

const checkStatus = (launch, id, complete, error, end, command, token) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const interval = setInterval(async () => {
    try {
      const input = {
        CommandId: id,
        InstanceId: environment.serverInstanceId,
        Details: true,
      };
      const data = await launch.send(new ListCommandInvocationsCommand(input));
      if (data) {
        if (data.CommandInvocations[0].Status === 'Failed') {
          tries += 1;
          if (tries === 3) {
            console.log('Command failed...');
            clearInterval(interval);
            tries = 0;
            if (!end) {
              error();
            }
            await end(command, token);
          }
        }
        if (data.CommandInvocations[0].Status === 'Success') {
          clearInterval(interval);
          finish(command, token, end, complete);
        }
        if (data.CommandInvocations[0].Status === 'InProgress') {
          if (command === 'STOP') {
            console.log('Status: pending');
            clearInterval(interval);
            finish(command, token, end, complete);
          }
          if (command === 'START') {
            console.log('Status: loading');
          }
        }
      }
    } catch (error_) {
      console.log('Error checking command status', error_);
      clearInterval(interval);
      error();
    }
  }, 10_000);
};

let checkInterval: NodeJS.Timer;

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
    await sendCommand(
      command,
      launch,
      complete,
      error,
      end,
      token,
      selectedBranch,
      latestBranch,
    );
  }, 15_000);
};

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
      InstanceIds: [environment.serverInstanceId],
      Comment: 'Sending shell script...',
      Parameters: {
        commands: [
          '#!/bin/bash',
          'cd /home/ubuntu',
          setScript(command, error, end, token, selectedBranch, latestBranch),
        ],
      },
    };
    const data = await launch.send(new SendCommandCommand(parameters));
    if (data) {
      clearInterval(checkInterval);
      checkStatus(
        launch,
        data.Command.CommandId,
        complete,
        error,
        end,
        command,
        token,
      );
    } else {
      console.log('Error sending launch command', data);
      error(command, token);
    }
  } catch (error_) {
    if (trySend === 0) {
      if (command === 'START') {
        console.log('Instance is still initializing...');
      }
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
      trySend += 1;
    } else if (trySend === 3) {
      trySend = 0;
      console.log('Error sending command');
      clearInterval(checkInterval);
      error(error_);
    } else {
      console.log('Retrying...');
      trySend += 1;
    }
  }
};

const commands = async (
  command: string,
  token: string,
  complete: () => void,
  error: (command?: string, token?: string) => void,
  end?: EndType,
  selectedBranch?: string,
  latestBranch?: string,
) => {
  try {
    if (!token && process.env.NODE_ENV === 'production') {
      console.log('Token missing, please sign in');
      error(command, token);
    }
    const launch = await ssm(token);
    if (launch) {
      await sendCommand(
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
      console.log('Error in command launch', launch);
      error(command, token);
    }
  } catch (error_) {
    console.log('Error catch in command launch', error_);
    error(command, token);
  }
};

export default commands;
