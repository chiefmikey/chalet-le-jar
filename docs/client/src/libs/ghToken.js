import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const REGION = 'us-east-2';
const IDENTITY_POOL_ID = 'us-east-2:9de629c9-c774-42ef-b641-d06eb430f8d8';
const secretName = 'repo';

const client = async (ID_TOKEN) => {
  try {
    return await new SecretsManagerClient({
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
    console.log('Launch secrets client error', error);
    return error;
  }
};

const data = async (ID_TOKEN) => {
  try {
    const secure = await client(ID_TOKEN);
    const data = await secure.send(
      new GetSecretValueCommand({ SecretId: secretName }),
    );
    if (data && data.SecretString) {
      return data.SecretString;
    }
    return data;
  } catch (error) {
    console.log('Error sending secret value command', error);
    return error;
  }
};

const getToken = async (ID_TOKEN) => {
  try {
    const secret = await data(ID_TOKEN);
    return JSON.parse(secret).repo;
  } catch (error) {
    console.log('Error getting token data', error);
    return error;
  }
};

export default getToken;
