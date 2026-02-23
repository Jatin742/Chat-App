import { ContactType } from "@/enum/ContactType";

export interface IContactDetails {
  _id: string;
  name: string;
  email?: string;
  image?: string;
  color?: number;
  contactType: ContactType;
}