import { ContactEnum } from "@/enum/ContactEnum";

export interface IBaseContact {
  _id: string;
  contactType: ContactEnum;
  image: string;
  color: number;
}