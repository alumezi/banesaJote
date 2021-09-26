import { Document } from 'mongoose';

export interface IProperty extends Document {
  address: {
    road: string;
    number: number;
  };
  neighborhood: string;
  numberOfRooms: number;
  features: string[];
  size: number;
  price: number;
  levelOfquietness: number;
  amenities: string[];
  pictureUrls: string[];
}
