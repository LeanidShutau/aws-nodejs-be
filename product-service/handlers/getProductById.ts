import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { findById } from './imitateDB';

export const get: APIGatewayProxyHandler = async (event, _context) => {
  const { productId } = event.pathParameters || {};
  const product = await findById(productId);
  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Not Found",
      }, null, 2),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      product: product,
    }, null, 2),
  };
}
