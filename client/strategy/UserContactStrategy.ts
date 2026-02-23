import { IContactDetails } from "@/interface/IContactDetails";
import { IUser } from "@/interface/IUser";
import { IContactDetailsStrategy } from "./IContactDetailsStrategy";

export class UserContactStrategy implements IContactDetailsStrategy {
  getDetails(contact: IUser): IContactDetails {
    return {
      _id: contact._id,
      name: `${contact.firstName} ${contact.lastName}`,
      email: contact.email,
      image: contact.image,
      color: contact.color,
      contactType: contact.contactType,
    };
  }
}