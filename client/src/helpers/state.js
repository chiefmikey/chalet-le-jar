import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import launchClient from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0ca1ce46c83788324', 'i-0c043740e90887911'] };

const state = async (command, token) => {
  if (command.toUpperCase() === 'START') {
    try {
      const launch = await launchClient(token);
      if (launch) {
        const data = await launch.send(new StartInstancesCommand(params));
        console.log('Success - starting instances', data.StartingInstances);
        return data;
      }
    } catch (e) {
      console.log('Error2', e);
    }
  } else if (command.toUpperCase() === 'STOP') {
    try {
      const launch = await launchClient(token);
      if (launch) {
        const data = await launch.send(new StopInstancesCommand(params));
        console.log('Success - stopping instances', data.StoppingInstances);
        return data;
      }
    } catch (e) {
      console.log('Error', e);
    }
  }
  return null;
};

export default state;
