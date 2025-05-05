export interface moimCard {
  id: number;
  title: string;
  category: string;
  is_closed: boolean;
  date: string;
  place_name: string;
  latitude: number;
  longitude: number;
  max_people: number;
  img_url?: string;
}
