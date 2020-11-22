import { SQSHandler } from 'aws-lambda';
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
}
