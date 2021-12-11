import { SSMClient } from '@aws-sdk/client-ssm';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

import environment from '../environment';

const REGION = environment.region;
const IDENTITY_POOL_ID = environment.identityPoolId;

const ssm = (ID_TOKEN: string) => {
  try {
    return new SSMClient({
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
    console.log('Launch ssm client error', error);
    return error;
  }
};
export default ssm;
