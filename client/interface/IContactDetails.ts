import { ContactEnum } from "@/enum/ContactEnum";

export interface IContactDetails {
  _id: string;
  name: string;
  email?: string;
  image?: string;
  color?: number;
  contactType: ContactEnum;
}