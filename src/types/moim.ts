export interface User {
  id: number;
  nickname: string;
  profile_image: string;
}

export interface Moim {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  is_closed: boolean;
  max_people: number;
  created_at: string;
  updated_at: string;
  writer: User;
  participants: User[];
  is_liked: boolean;
  is_applied: boolean;
}

export interface MoimPayload {
  id: number;
  title: string;
  category: string;
  content: string;
  moim: string;
  place: string;
  date: string;
  roles: {
    prop1: number;
    prop2: number;
    prop3: number;
  };
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
  roles: {
    prop1: number;
    prop2: number;
    prop3: number;
  };
  img_url?: string;
}
