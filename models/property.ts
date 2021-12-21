import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IProperty } from '../types';

const propertySchema: Schema = new Schema({
  address: {
    road: String,
    number: Number,
  },
  neighborhood: String,
  numberOfRooms: Number,
  features: [String],
  size: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  levelOfquietness: Number,
  amenities: [String],
  pictureUrls: [String],
  parking: Boolean,
});

propertySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

propertySchema.plugin(uniqueValidator);

export default model<IProperty>('Property', propertySchema);
