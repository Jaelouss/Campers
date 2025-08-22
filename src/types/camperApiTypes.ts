export interface GalleryItem {
  thumb: string;
  original: string;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: GalleryItem[];
  reviews: Review[];
}

export interface CampersResponse {
  total: number;
  items: Camper[];
}

export interface CamperFilters {
  location?: string;
  AC?: boolean;
  transmission?: string;
  kitchen?: boolean;
  TV?: boolean;
  bathroom?: boolean;
  type?: string;
  [key: string]: string | number | boolean | undefined;
}
