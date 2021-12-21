import { Document } from 'mongoose';

export interface IFilter extends Document {
  id: string;
  name: string;
  searchKey: string;
}

export interface IFilters extends Document {
  name: 'neighborhood' | 'byParkingType' | 'byNumberOfRooms';
  filters: IFilter[];
}
