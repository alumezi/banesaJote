import { Document } from 'mongoose';

export interface IFilter extends Document {
  id: string;
  name: string;
}

export interface IFilters extends Document {
  name: 'byLocation' | 'byParkingTypes' | 'byNumberOfRooms';
  filters: IFilter[];
}
