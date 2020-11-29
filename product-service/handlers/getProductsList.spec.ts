import { getProductsList } from './getProductsList';

it.skip('renders correctly', async () => {
  const result = await getProductsList(null, null, null);
  expect(result).toMatchSnapshot();
});
