import { IBaseContact } from "./IBaseContact";

export interface IUser extends IBaseContact {
  email: string;
  firstName: string;
  lastName: string;
  color: number;
  profileSetup: boolean;
  image: string;
}