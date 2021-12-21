import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IFilters } from '../types';

const filterSchema: Schema = new Schema({
  id: { type: String, unique: true },
  name: { type: String, unique: true },
  searchKey: { type: String, unique: true },
});

const filtersSchema: Schema = new Schema({
  name: { type: String, unique: true },
  filters: [filterSchema],
});

filtersSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

filterSchema.plugin(uniqueValidator);

export default model<IFilters>('Filters', filtersSchema);
