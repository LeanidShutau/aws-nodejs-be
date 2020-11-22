import { SQSHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import 'source-map-support/register';

import { createProduct, validateProduct } from './products-db';

export const catalogBatchProcess: SQSHandler = async (event, _context) => {
  for (const { body } of event.Records) {
    try {
      const parsedBody = JSON.parse(body);
      if (validateProduct(parsedBody)) {
        await createProduct(parsedBody);
      } else {
        console.error(`Invalid product:`, body);
      }
    } catch (err) {
      console.error(err);
    } 
  }

  const sns = new AWS.SNS({
    region: 'eu-west-1',
  });

  await sns.publish({
    Subject: 'New products have been imported',
    Message: JSON.stringify(event.Records.map(({ body }) => body), null, 2),
    TopicArn: process.env.SNS_ARN,
  }).promise();
}
