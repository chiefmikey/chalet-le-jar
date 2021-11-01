import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import launchClient from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0ca1ce46c83788324', 'i-0c043740e90887911'] };

const interval = (data) =>
  setInterval(() => {
    for (let i = 0; i < data.length; i += 1) {
      console.log(
        'Previous State: ',
        data[i].previousState.name,
        'Current State: ',
        data[i].currentState.name,
      );
    }
    return data;
  }, 5000);

const startInstances = async (token) => {
  try {
    const launch = await launchClient(token);
    if (launch) {
      const data = await launch.send(new StartInstancesCommand(params));
      interval(data);
    }
  } catch (e) {
    console.log('Error launching AWS client', e);
  }
  return null;
};

const stopInstances = async (token) => {
  try {
    const launch = await launchClient(token);
    if (launch) {
      const data = await launch.send(new StopInstancesCommand(params));
      interval(data);
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
      await startInstances(token);
    } else if (command.toUpperCase() === 'STOP') {
      await stopInstances(token);
    }
    return null;
  } catch (e) {
    console.log('Error with instance command', e);
  }
  return null;
};

export default state;
