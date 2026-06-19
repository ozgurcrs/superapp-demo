import axios from 'axios';
import type {AxiosInstance} from 'axios';

interface HttpClientConfig {
  baseURL: string;
  token?: string;
}

export function createHttpClient({
  baseURL,
  token,
}: HttpClientConfig): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
  });

  instance.interceptors.request.use(config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      // FAZ 4'te core error handling buraya gelecek (401 → logout vb.)
      return Promise.reject(error);
    },
  );

  return instance;
}
