export interface IProperty {
  id?: string;
  address: {
    road: string;
    number: number;
  };
  neighborhood: string;
  numberOfRooms: number;
  features: string[];
  size: number;
  price: number;
  levelOfquietness?: number;
  amenities: string[];
  pictureUrls?: string[];
  date?: Date;
  [key: string]: any;
}
