import { APIGatewayProxyEvent } from 'aws-lambda';
import { getProductById } from './getProductById';

it.skip('should response with a product', async () => {
  const result = await getProductById({
    pathParameters: {
      productId: '5ecff64a-16c4-4f04-a68b-9dbd9f84dd7e',
    }
  } as unknown as APIGatewayProxyEvent, null, null);
  expect(result).toMatchSnapshot();
});

it.skip('should reject with 404 error', async () => {
  const result = await getProductById({
    pathParameters: {
      productId: '83c8709f-23fb-465f-bc96-9e35f33554e9',
    }
  } as unknown as APIGatewayProxyEvent, null, null);
  expect(result).toMatchSnapshot();
});

