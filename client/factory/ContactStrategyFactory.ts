import { ContactType } from "@/enum/ContactType";
import { IBaseContact } from "@/interface/IBaseContact";
import { ChannelContactStrategy } from "@/strategy/ChannelContactStrategy";
import { IContactDetailsStrategy } from "@/strategy/IContactDetailsStrategy";
import { UserContactStrategy } from "@/strategy/UserContactStrategy";

export class ContactStrategyFactory {
  static getStrategy(contact: IBaseContact): IContactDetailsStrategy {
    const type = contact.contactType;
    
    switch (type) {
      case ContactType.USER:
        return new UserContactStrategy();

      case ContactType.CHANNEL:
        return new ChannelContactStrategy();

      default:
        throw new Error("Invalid Contact Type");
    }
  }
}