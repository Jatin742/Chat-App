import { IUser } from "./IUser";

export interface ContactListProps {
  contacts: IUser[];
  isChannel?: boolean;
}