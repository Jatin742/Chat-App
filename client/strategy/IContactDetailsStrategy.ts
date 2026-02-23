import { IBaseContact } from "@/interface/IBaseContact";
import { IContactDetails } from "@/interface/IContactDetails";

export interface IContactDetailsStrategy {
  getDetails(contact: IBaseContact): IContactDetails;
}