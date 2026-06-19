import {marketClient} from './marketClient';

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export async function fetchPhoto(): Promise<Photo> {
  const response = await marketClient.get<Photo>('/photos/10');
  return response.data;
}
