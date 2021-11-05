import { SSMClient } from '@aws-sdk/client-ssm';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const REGION = 'us-east-2';
const IDENTITY_POOL_ID = 'us-east-2:9de629c9-c774-42ef-b641-d06eb430f8d8';

const ssm = async (ID_TOKEN) => {
  try {
    return await new SSMClient({
      region: REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: REGION },
        identityPoolId: IDENTITY_POOL_ID,
        logins: {
          'accounts.google.com': ID_TOKEN,
        },
      }),
    });
  } catch (e) {
    console.log('Launch ssm error', e);
    return e;
  }
};
export default ssm;
