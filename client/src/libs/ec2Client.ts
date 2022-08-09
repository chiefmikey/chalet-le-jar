import { EC2Client } from '@aws-sdk/client-ec2';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

import environment from '../environment';

const REGION = environment.region;
const IDENTITY_POOL_ID = environment.identityPoolId;

const ec2 = (ID_TOKEN: string) => {
  try {
    return new EC2Client({
      region: REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: REGION },
        identityPoolId: IDENTITY_POOL_ID,
        logins: {
          'accounts.google.com': ID_TOKEN,
        },
      }),
    });
  } catch (error) {
    console.log('Launch ec2 client error', error);
    return error;
  }
};
export default ec2;
