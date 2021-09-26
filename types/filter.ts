import { Document } from 'mongoose';

export interface IFilter extends Document {
  id: string;
  name: string;
}

export interface IFilters extends Document {
  name: string;
  filters: IFilter[];
}
