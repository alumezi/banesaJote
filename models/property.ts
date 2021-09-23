/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const propertySchema = new mongoose.Schema({
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
});

propertySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-param-reassign
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-param-reassign
    delete returnedObject.__v;
  },
});

propertySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Property', propertySchema);
