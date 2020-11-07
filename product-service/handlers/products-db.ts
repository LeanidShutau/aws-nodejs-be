import { Client } from 'pg';
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: Number(PG_PORT),
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export interface ProductEntity {
  id: string,
  title: string,
  description: string,
  price: number,
  image: string,
  count: number,
}

export async function findAll(): Promise<ProductEntity[]> {
  const client = new Client(dbOptions);
  await client.connect();
  try {
    const productsResponse = await client.query(`
      select
        PR.*,
        coalesce(ST.count, 0) as count
      from
        public.products PR
      left join public.stocks ST on
        PR.id = ST.product_id`);
    return productsResponse.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.end();
  }
}

export async function findById(productId: string): Promise<ProductEntity> {
  const client = new Client(dbOptions);
  await client.connect();
  try {
    const queryResponse = await client.query(`
      select
        PR.*,
        coalesce(ST.count, 0) as count
      from
        public.products PR
      left join public.stocks ST on
        PR.id = ST.product_id
      where PR.id = $1`, [productId]);
    const [product] = queryResponse.rows;
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.end();
  }
}
