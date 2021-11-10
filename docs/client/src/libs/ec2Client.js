import { EC2Client } from '@aws-sdk/client-ec2';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const REGION = 'us-east-2';
const IDENTITY_POOL_ID = 'us-east-2:9de629c9-c774-42ef-b641-d06eb430f8d8';

const ec2 = async (ID_TOKEN) => {
  try {
    return await new EC2Client({
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
