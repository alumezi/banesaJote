import { Document } from 'mongoose';
import { IProperty } from './property';

export interface IUser extends Document {
  facebookID: string;
  username: string;
  displayName: string;
  emails: string[];
  date: Date;
  user_link: string;
  passwordHash: string;
  properties: IProperty[];
}
