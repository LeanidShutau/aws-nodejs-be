import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { findById } from './imitateDB';

export const get: APIGatewayProxyHandler = async (event, _context) => {
  const { productId } = event.pathParameters || {};
  return {
    statusCode: 200,
    body: JSON.stringify({
      product: await findById(productId),
    }, null, 2),
  };
}
