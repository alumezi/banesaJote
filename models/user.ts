import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser } from '../types';

const userSchema = new Schema({
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
      type: Schema.Types.ObjectId,
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

export default model<IUser>('User', userSchema);
