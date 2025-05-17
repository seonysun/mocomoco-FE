import { User } from '@/types/moim';

export type MyMoim = {
  id: number;
  title: string;
  content: string;
  category: string;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  image?: string | null;
  date: string;
  max_people: number;
  is_closed: boolean;
  created_at: string;
  updated_at?: string;
  is_liked: boolean;
  is_applied: boolean;
  current_people: number;
  participants?: User[];
  role_status?: {
    backend?: number;
    designer?: number;
    frontend?: number;
    fullstack?: number;
  };
  is_writer: boolean;
};
