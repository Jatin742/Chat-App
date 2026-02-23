import { IBaseContact } from "./IBaseContact";

export interface ContactListProps {
  contacts: IBaseContact[];
  isChannel?: boolean;
}