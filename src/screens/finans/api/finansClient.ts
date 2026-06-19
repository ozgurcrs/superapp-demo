import {createHttpClient} from '../../../services/httpClient';

export const finansClient = createHttpClient({
  baseURL: 'https://blockchain.info',
});
