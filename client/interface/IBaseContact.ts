import { ContactType } from "@/enum/ContactType";

export interface IBaseContact {
  _id: string;
  type: ContactType;
}