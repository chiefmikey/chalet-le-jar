import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import launchClient from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0ca1ce46c83788324', 'i-0c043740e90887911'] };

const state = async (command) => {
  if (await launchClient()) {
    if (command.toUpperCase() === 'START') {
      try {
        const data = await launchClient().send(
          new StartInstancesCommand(params),
        );
        console.log('Success', data.StartingInstances);
        return data;
      } catch (e) {
        console.log('Error2', e);
      }
    } else if (process.argv[2].toUpperCase() === 'STOP') {
      try {
        const data = await launchClient().send(
          new StopInstancesCommand(params),
        );
        console.log('Success', data.StoppingInstances);
        return data;
      } catch (e) {
        console.log('Error', e);
      }
    }
  }
  return null;
};

export default state;
