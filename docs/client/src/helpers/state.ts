import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';

import environment from '../environment';
import ec2 from '../libs/ec2Client';

const parameters = {
  InstanceIds: [environment.serverInstanceId],
};
const parameters2 = {
  InstanceIds: [environment.dnsInstanceId],
  Hibernate: true,
};
let ready = {};
let tries = 0;
let runEnd = false;

const isStarted = (command, data, index) => {
  if (command === 'START' && data[index].CurrentState.Name === 'running') {
    ready[data[index].InstanceId] = true;
  }
  if (command === 'STOP' && data[index].CurrentState.Name === 'stopped') {
    ready[data[index].InstanceId] = true;
  }
  if (
    data[index].InstanceId === parameters2.InstanceIds[0] &&
    ready[parameters2.InstanceIds[0]] &&
    tries === 1
  ) {
    if (command === 'START') {
      console.log('Server already started');
    }
    if (command === 'STOP') {
      console.log('Server already stopped');
    }
    runEnd = true;
  }
};

const changeState = (data, interval, command, end, token, complete) => {
  tries += 1;
  for (let index = 0; index < data.length; index += 1) {
    console.log(`Status: ${data[index].CurrentState.Name}`);
    isStarted(command, data, index);
    if (Object.keys(ready).length === data.length) {
      clearInterval(interval);
      tries = 0;
      ready = {};
      if (!end || runEnd) {
        runEnd = false;
        complete();
      } else {
        end(command, token);
      }
    }
  }
};

const interval = async (command, launch, end, token, complete, error) => {
  const checkState = (
    setInterval as (callback: () => Promise<void>, ms: number) => void
  )(async () => {
    try {
      let SendCommand;
      if (command === 'START') {
        SendCommand = StartInstancesCommand;
        await launch.send(new SendCommand(parameters));
      }
      if (command === 'STOP') {
        SendCommand = StopInstancesCommand;
      }
      const data =
        launch.send && SendCommand
          ? await launch.send(new SendCommand(parameters2))
          : undefined;
      if (data) {
        if (data.StartingInstances) {
          changeState(
            data.StartingInstances,
            checkState,
            command,
            end,
            token,
            complete,
          );
        }
        if (data.StoppingInstances) {
          changeState(
            data.StoppingInstances,
            checkState,
            command,
            end,
            token,
            complete,
          );
        }
      } else {
        console.log('Error sending state', data);
        clearInterval(checkState);
        tries = 0;
        error();
      }
      if (!command) {
        console.log('Invalid command');
        error();
      }
    } catch (error_) {
      console.log('Error creating interval', error_);
      clearInterval(checkState);
      tries = 0;
      error();
    }
  }, 10_000);
};

const state = async (command, token, end, complete, error) => {
  try {
    if (!token && process.env.NODE_ENV === 'production') {
      console.log('Token missing, please sign in');
      error();
    } else {
      const launch = ec2(token);
      if (launch) {
        await interval(command, launch, end, token, complete, error);
      } else {
        console.log('Error in state', launch);
        error();
      }
    }
  } catch (error_) {
    console.log('Error in state', error_);
    error();
  }
};

export default state;
