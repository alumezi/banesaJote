/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  facebookID: {
    type: String,
    unique: true,
    required: false,
  },
  username: {
    type: String,
    unique: true,
    required: false,
    minlength: 3,
  },
  displayName: String,
  emails: Array,
  date: Date,
  user_link: String,
  passwordHash: {
    type: String,
    required: false,
  },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
