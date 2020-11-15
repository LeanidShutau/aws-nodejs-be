import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import 'source-map-support/register';

const headers = {
  'Access-Control-Allow-Origin': '*',
};

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
  try {
    console.log('queryStringParameters: ', event.queryStringParameters);
    const { name } = event.queryStringParameters || {};
    const path = `uploaded/${name}`;

    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const params = {
      Bucket: 'lshutau-rs-uploaded',
      Key: path,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const url = await new Promise<string>((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
          return reject(err);
        }

        resolve(url);
      });
    });

    return {
      statusCode: 200,
      body: url,
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
