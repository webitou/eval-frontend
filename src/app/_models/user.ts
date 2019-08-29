export interface IUser {
  _id: string;
  userId: string;
  admin: boolean;
  email: string;
  fullname: string;
  lastLogin: number;
  token?: string;
}
