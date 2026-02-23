import { IChannel } from "@/interface/IChannel";
import { IContactDetails } from "@/interface/IContactDetails";
import { IContactDetailsStrategy } from "./IContactDetailsStrategy";

export class ChannelContactStrategy implements IContactDetailsStrategy {
  getDetails(contact: IChannel): IContactDetails {
    return {
      _id: contact._id,
      name: contact.name,
    };
  }
}