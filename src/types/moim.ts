export interface User {
  id: number;
  nickname: string;
  profile_image: string | null;
}

export interface GetMoimDetail {
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
  writer: {
    id: number;
    nickname: string;
    profile_image: string | null;
  };
  is_liked: boolean;
  is_applied: boolean;
  current_people: number;
  participants?: [
    {
      id: number;
      nickname: string;
      profile_image: string | null;
    },
  ];
  role_status?: {
    backend?: number;
    designer?: number;
    frontend?: number;
    fullstack?: number;
  };
}

export interface GetMoimList {
  id: number;
  title: string;
  category: string;
  is_closed: boolean;
  is_applied: boolean;
  is_writer: boolean;
  is_liked: boolean;
  date: string;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  max_people: number;
  status: number;
  role_status: {
    backend: number;
    designer: number;
    frontend: number;
    fullstack: number;
  };
  image?: string;
}

export interface PostMoim {
  title: string;
  category: string;
  content: string;
  place_name: string;
  address: string;
  date: string;
  latitude: number;
  longitude: number;
  roles: Record<string, number>;
  image?: string;
}

export interface moimCard {
  id: number;
  title: string;
  category: string;
  is_closed: boolean;
  is_applied: boolean;
  is_writer: boolean;
  is_liked: boolean;
  date: string;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  max_people: number;
  status: number;
  role_status: {
    backend: number;
    designer: number;
    frontend: number;
    fullstack: number;
  };
  image?: string;
}
