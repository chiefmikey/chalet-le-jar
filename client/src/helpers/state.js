import {
  StartInstancesCommand,
  StopInstancesCommand,
} from '@aws-sdk/client-ec2';
import launchClient from '../libs/ec2Client.js';

const params = { InstanceIds: ['i-0ca1ce46c83788324', 'i-0c043740e90887911'] };

const interval = (command, launch) => {
  let ready = {};
  const checkState = setInterval(async () => {
    try {
      const SendCommand =
        command === 'START' ? StartInstancesCommand : StopInstancesCommand;
      const data = await launch.send(new SendCommand(params));
      if (data) {
        for (let i = 0; i < data.length; i += 1) {
          console.log(
            `${data[i].InstanceId} Previous State: ${data[i].PreviousState.Name}`,
            ` ${data[i].InstanceId} Current State: ${data[i].CurrentState.Name}`,
          );
          if (command === 'STOP' && data[i].CurrentState.Name === 'stopped') {
            ready[data[i].InstanceId] = true;
            ready += 1;
            console.log('Instance updated');
          }
          if (command === 'START' && data[i].CurrentState.Name === 'running') {
            ready[data[i].InstanceId] = true;
            ready += 1;
            console.log('Instance updated');
          }
          if (Object.keys(ready).length === data.length) {
            console.log('All instances updated');
            clearInterval(checkState);
          }
        }
      } else {
        console.log('Error sending launch command', data);
        clearInterval(checkState);
      }
    } catch (e) {
      console.log('Error creating interval', e);
      clearInterval(checkState);
    }
  }, 5000);
};

const TOKEN =
  process.env.NODE_ENV !== 'production'
    ? await import('../../../token.js')
    : null;

const state = async (command, token) => {
  try {
    if (!token && !TOKEN.default) {
      console.log('Token missing, please sign in');
      return null;
    }
    const launch = await launchClient(token || TOKEN.default);
    if (launch) {
      interval(command, launch);
    } else {
      console.log('Error launching AWS client', launch);
    }
  } catch (e) {
    console.log('Error launching AWS client', e);
  }
  return null;
};

export default state;
