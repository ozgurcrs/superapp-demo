import {createHttpClient} from '../../../services/httpClient';

export const marketClient = createHttpClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
