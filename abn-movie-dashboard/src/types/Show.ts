import { Cast } from '@/types/Cast'

export interface ShowImage {
  medium: string;
  original: string;
}

export interface ShowRating {
  average: number | null;
}

export interface ShowSchedule {
  time: string;
  days: string[];
}

export interface Show {
  id: number;
  name: string;
  summary?: string;
  image?: ShowImage;
  genres: string[];
  rating: ShowRating;
  language?: string;
  schedule?: ShowSchedule;
  premiered?: string;
  status?: string;
  runtime?: number;
  officialSite?: string;
  _embedded?: {
    cast?: Cast[]
  }
}