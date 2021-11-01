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
            console.log(
              'Previous State: ',
              turnOn[i].previousState.name,
              'Current State: ',
              turnOn[i].currentState.name,
            );
          }
        } catch (e) {
          console.log('Error starting instances', e);
          return data;
        }
        return null;
      }, 5000);
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
            console.log(
              'Previous State: ',
              turnOff[i].previousState.name,
              'Current State: ',
              turnOff[i].currentState.name,
            );
          }
        } catch (e) {
          console.log('Error stopping instances', e);
          return data;
        }
        return data;
      }, 5000);
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
