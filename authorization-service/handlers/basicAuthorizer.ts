import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
import 'source-map-support/register';

export const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async (event, _context) => {
  if (event.type !== 'TOKEN') {
    throw new Error('Unauthorized')
  }

  try {
    const authorizationTokern = event.authorizationToken;

    const [, encodedCreds] = authorizationTokern.split(' ');
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const [username, password] = plainCreds;

    console.log(`username: ${username} and password: ${password}`);

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    return generatePolicy(encodedCreds, event.methodArn, effect);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const generatePolicy = (principalId, resource, effect = 'Allow'): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }
      ],
    },
  };
}
