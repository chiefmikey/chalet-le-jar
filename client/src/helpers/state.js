import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import launchClient from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0ca1ce46c83788324', 'i-0c043740e90887911'] };

const interval = (command, data) => {
  let done = false;
  console.log(data);
  setInterval(() => {
    for (let i = 0; i < data.length; i += 1) {
      console.log(
        'Previous State: ',
        data[i].previousState.name,
        'Current State: ',
        data[i].currentState.name,
      );
      if (data[i].currentState.name === command) {
        console.log('State successfully updated');
        done = true;
      }
    }
  }, 5000);
  if (done) {
    console.log('Done');
    return done;
  }
  return done;
};

const startInstances = async (command, token) => {
  try {
    const launch = await launchClient(token);
    if (launch) {
      const data = await launch.send(new StartInstancesCommand(params));
      if (data) {
        interval(data.StartingInstances);
      } else {
        console.log('Error sending start command', data);
      }
    } else {
      console.log('Error launching AWS client', launch);
    }
  } catch (e) {
    console.log('Error launching AWS client', e);
  }
  return null;
};

const stopInstances = async (command, token) => {
  try {
    const launch = await launchClient(token);
    if (launch) {
      const data = await launch.send(new StopInstancesCommand(params));
      if (data) {
        interval(data.StoppingInstances);
      } else {
        console.log('Error sending stop command', data);
      }
    } else {
      console.log('Error launching AWS client', launch);
    }
  } catch (e) {
    console.log('Error launching AWS client', e);
  }
  return null;
};

const state = async (command, token) => {
  try {
    if (!token) {
      console.log('Token missing, please sign in');
      return null;
    }
    if (command.toUpperCase() === 'START') {
      return await startInstances(token);
    }
    if (command.toUpperCase() === 'STOP') {
      return await stopInstances(token);
    }
    return null;
  } catch (e) {
    console.log('Error with instance command', e);
  }
  return null;
};

export default state;
