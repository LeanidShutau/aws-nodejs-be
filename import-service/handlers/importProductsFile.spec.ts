import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWSMock from 'aws-sdk-mock';

import { importProductsFile } from './importProductsFile';

describe('importProductsFile', () => {
  it('should return signedUrl', async () => {
    AWSMock.mock('S3', 'getSignedUrl', (_, __, cb) => {
      cb(null, 'https://signedurl.com');
    });
    const signedUrl = await importProductsFile({
      queryStringParameters: {
        name: 'file.csv'
      }
    } as any, null, null) as unknown as APIGatewayProxyResult;

    expect(signedUrl.body).toMatchSnapshot();
  });
})
