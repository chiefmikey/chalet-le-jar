import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import launchClient from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0ca1ce46c83788324', 'i-0c043740e90887911'] };
let ready = {};

const changeState = (data, interval, command, end) => {
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
      end();
      return true;
    }
  }
  console.log('State change in progress...');
  return false;
};

const interval = async (command, launch, end) => {
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
      console.log(`${command} command sent`);
      if (data) {
        if (data.StartingInstances) {
          return changeState(data.StartingInstances, checkState, command, end);
        }
        if (data.StoppingInstances) {
          return changeState(data.StoppingInstances, checkState, command, end);
        }
      } else {
        console.log('Error sending launch command', data);
        clearInterval(checkState);
      }
      console.log('Invalid command');
      return false;
    } catch (e) {
      console.log('Error creating interval', e);
      clearInterval(checkState);
      return false;
    }
  }, 5000);
};

const state = async (command, token, end) => {
  try {
    if (!token && process.env.NODE_ENV === 'production') {
      console.log('Token missing, please sign in');
      return false;
    }
    const launch = await launchClient(token);
    if (launch) {
      return interval(command, launch, end);
    }
    console.log('Error launching AWS client', launch);
    return false;
  } catch (e) {
    console.log('Error launching AWS client', e);
    return false;
  }
};

export default state;
