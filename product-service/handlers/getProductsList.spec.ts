import { getProductsList } from './getProductsList';

it('renders correctly', async () => {
  const result = await getProductsList(null, null, null);
  expect(result).toMatchSnapshot();
});
