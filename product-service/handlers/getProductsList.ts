import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { findAll } from './imitateDB';

export const get: APIGatewayProxyHandler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        products: await findAll()
      }, null, 2),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err, null, 2),
    };
  }

}
