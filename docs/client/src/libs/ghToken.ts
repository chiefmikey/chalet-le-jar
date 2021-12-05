import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

import environment from '../environment';

const REGION = environment.region;
const IDENTITY_POOL_ID = environment.identityPoolId;
const { secretName } = environment;

const client = (ID_TOKEN: string) => {
  try {
    return new SecretsManagerClient({
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

const data = async (ID_TOKEN: string) => {
  try {
    const secure = await client(ID_TOKEN);
    const getData: object = await secure.send(
      new GetSecretValueCommand({ SecretId: secretName }),
    );
    if (getData && getData.SecretString) {
      return getData.SecretString;
    }
    return getData;
  } catch (error) {
    console.log('Error sending secret value command', error);
    return error;
  }
};

const getToken = async (ID_TOKEN: string) => {
  try {
    const secret: string = await data(ID_TOKEN);
    return JSON.parse(secret).repo;
  } catch (error) {
    console.log('Error getting token data', error);
    return error;
  }
};

export default getToken;
