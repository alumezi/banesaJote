import { IProperty } from './property';

export interface IUser {
  id: string;
  facebookID: string;
  username: string;
  displayName: string;
  emails: string[];
  date: Date;
  user_link: string;
  passwordHash: string;
  properties: IProperty[];
}
