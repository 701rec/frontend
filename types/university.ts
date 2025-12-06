export interface University {
  id: number;
  name: string;
  shortName: string;
  type: string;
  price: string;
  rating: number;
  location: string;
  imageUrl: string;
  description: string;
  contacts: string;
  website: string;
  military: boolean;
  dorm: boolean;
  focus: string;
  programs: string[];
  coordinates?: [number, number];
}
