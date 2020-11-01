import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { findAll } from './imitateDB';

export const get: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      products: await findAll()
    }, null, 2),
  };
}
