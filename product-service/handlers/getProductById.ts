import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { findById } from './products-db';

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PATCH, PUT',
  };
  try {
    const { productId } = event.pathParameters || {};
    const product = await findById(productId);
    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Not Found",
        }, null, 2),
        headers,
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        product,
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
