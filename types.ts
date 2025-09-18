
export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq. ft.
  description: string;
  amenities: string[];
  images: string[];
  type: '1BHK' | '2BHK' | '3BHK' | '4BHK+';
  isFeatured: boolean;
  floorPlanUrl?: string;
}
