import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { findAll } from './imitateDB';

export const get: APIGatewayProxyHandler = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PATCH, PUT',
  }
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        products: await findAll()
      }, null, 2),
      headers,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err, null, 2),
      headers,
    };
  }

}
