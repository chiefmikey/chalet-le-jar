import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import { ec2Client } from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0ca1ce46c83788324', 'i-0c043740e90887911'] };

const state = async (command) => {
  if (command.toUpperCase() === 'START') {
    try {
      const data = await ec2Client.send(new StartInstancesCommand(params));
      console.log('Success', data.StartingInstances);
      return data;
    } catch (err) {
      console.log('Error2', err);
    }
  } else if (process.argv[2].toUpperCase() === 'STOP') {
    try {
      const data = await ec2Client.send(new StopInstancesCommand(params));
      console.log('Success', data.StoppingInstances);
      return data;
    } catch (err) {
      console.log('Error', err);
    }
  }
};

export default state;
