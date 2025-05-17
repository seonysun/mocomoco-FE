import { User } from '@/types/moim';

export type MyMoim = {
  id: number;
  title: string;
  category: string;
  place_name: string;
  address: string;
  image?: string | null;
  date: string;
  max_people: number;
  is_closed: boolean;
  is_liked: boolean;
  is_applied: boolean;
  people_status: number;
  participants?: User[];
  role_status?: {
    backend?: number;
    designer?: number;
    frontend?: number;
    fullstack?: number;
  };
  is_writer: boolean;
};
