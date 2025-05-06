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
