import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import ec2 from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0c35872f8d010202c', 'i-0c043740e90887911'] };
let ready = {};

const changeState = (data, interval, command, end, token, complete) => {
  for (let i = 0; i < data.length; i += 1) {
    console.log(
      `${data[i].InstanceId} Current State: ${data[i].CurrentState.Name}`,
    );
    if (command === 'START' && data[i].CurrentState.Name === 'running') {
      ready[data[i].InstanceId] = true;
    }
    if (command === 'STOP' && data[i].CurrentState.Name === 'stopped') {
      ready[data[i].InstanceId] = true;
    }
    if (Object.keys(ready).length === data.length) {
      console.log('All instances updated');
      clearInterval(interval);
      ready = {};
      if (!end) {
        return complete();
      }
      return end(command, token);
    }
  }
  console.log('State change in progress...');
  return null;
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
      const data = await launch.send(new SendCommand(params));
      console.log(`${command} state sent`);
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
        error();
        return data;
      }
      console.log('Invalid command');
      error();
      return null;
    } catch (e) {
      console.log('Error creating interval', e);
      clearInterval(checkState);
      error();
      return e;
    }
  }, 5000);
};

const state = async (command, token, end, complete, error) => {
  try {
    if (!token && process.env.NODE_ENV === 'production') {
      console.log('Token missing, please sign in');
      error();
      return null;
    }
    const launch = await ec2(token);
    if (launch) {
      return interval(command, launch, end, token, complete, error);
    }
    console.log('Error in state', launch);
    error();
    return launch;
  } catch (e) {
    console.log('Error in state', e);
    error();
    return e;
  }
};

export default state;
