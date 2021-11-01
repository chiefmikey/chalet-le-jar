import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import launchClient from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0ca1ce46c83788324', 'i-0c043740e90887911'] };

const startInstances = async (token) => {
  try {
    const launch = await launchClient(token);
    if (launch) {
      const data = await launch.send(new StartInstancesCommand(params));
      setInterval(async () => {
        try {
          const turnOn = await state('START', token);
          for (let i = 0; i < turnOn.length; i += 1) {
            console.log('Instance 1: ', turnOn[i].previousState.name);
            console.log('Instance 2: ', turnOn[i].currentState.name);
          }
        } catch (e) {
          console.log('Error starting instances', e);
          return data;
        }
        return null;
      }, 1000);
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
      setInterval(async () => {
        try {
          const turnOff = await state('STOP', token);
          for (let i = 0; i < turnOff.length; i += 1) {
            console.log('Instance 1: ', turnOff[i].previousState.name);
            console.log('Instance 2: ', turnOff[i].currentState.name);
          }
        } catch (e) {
          console.log('Error stopping instances', e);
          return data;
        }
        return null;
      }, 1000);
    }
  } catch (e) {
    console.log('Error launching AWS client', e);
  }
  return null;
};

const state = async (command, token) => {
  try {
    if (command.toUpperCase() === 'START') {
      await startInstances(token);
    } else if (command.toUpperCase() === 'STOP') {
      await stopInstances(token);
    }
    return null;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export default state;
