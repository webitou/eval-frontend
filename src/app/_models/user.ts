export interface IUser {
  _id: string;
  admin: boolean;
  email: string;
  fullname: string;
  lastLogin: number;
  token?: string;
}
