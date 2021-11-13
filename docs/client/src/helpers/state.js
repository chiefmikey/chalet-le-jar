import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import ec2 from '../libs/ec2Client.js';

const parameters = {
  InstanceIds: ['i-0c35872f8d010202c', 'i-076f072b3e0baa3a2'],
};
let ready = {};
let tries = 0;
let runEnd = false;

const changeState = (data, interval, command, end, token, complete) => {
  tries += 1;
  for (let index = 0; index < data.length; index += 1) {
    console.log(
      `${data[index].InstanceId} Current State: ${data[index].CurrentState.Name}`,
    );
    if (command === 'START' && data[index].CurrentState.Name === 'running') {
      ready[data[index].InstanceId] = true;
    }
    if (command === 'STOP' && data[index].CurrentState.Name === 'stopped') {
      ready[data[index].InstanceId] = true;
    }
    if (
      data[index].InstanceId === parameters.InstanceIds[0] &&
      ready[parameters.InstanceIds[0]] &&
      tries === 1
    ) {
      console.log('Server already started');
      runEnd = true;
    }
    if (Object.keys(ready).length === data.length) {
      console.log('All instances updated');
      clearInterval(interval);
      tries = 0;
      ready = {};
      if (!end || runEnd) {
        runEnd = false;
        return complete();
      }
      return end(command, token);
    }
  }
  return console.log('State change in progress...');
};

const interval = async (command, launch, end, token, complete, error) => {
  const checkState = setInterval(async () => {
    try {
      let SendCommand;
      if (command === 'START') {
        SendCommand = StartInstancesCommand;
      }
      if (command === 'STOP') {
        SendCommand = StopInstancesCommand;
      }
      const data = await launch.send(new SendCommand(parameters));
      if (data) {
        if (data.StartingInstances) {
          return changeState(
            data.StartingInstances,
            checkState,
            command,
            end,
            token,
            complete,
          );
        }
        if (data.StoppingInstances) {
          return changeState(
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
        return data;
      }
      console.log('Invalid command');
      return error();
    } catch (error_) {
      console.log('Error creating interval', error_);
      clearInterval(checkState);
      tries = 0;
      error();
      return error_;
    }
  }, 10_000);
};

const state = async (command, token, end, complete, error) => {
  try {
    if (!token && process.env.NODE_ENV === 'production') {
      console.log('Token missing, please sign in');
      return error();
    }
    const launch = await ec2(token);
    if (launch) {
      return interval(command, launch, end, token, complete, error);
    }
    console.log('Error in state', launch);
    error();
    return launch;
  } catch (error_) {
    console.log('Error in state', error_);
    error();
    return error_;
  }
};

export default state;
