import { ContactEnum } from "@/enum/ContactEnum";
import { ChannelContactStrategy } from "@/strategy/ChannelContactStrategy";
import { IContactDetailsStrategy } from "@/strategy/IContactDetailsStrategy";
import { UserContactStrategy } from "@/strategy/UserContactStrategy";
import { ContactType } from "@/types/ContactType";

export class ContactStrategyFactory {
  static getStrategy(contact: ContactType): IContactDetailsStrategy {
    const type = contact.contactType;
    
    switch (type) {
      case ContactEnum.USER:
        return new UserContactStrategy();

      case ContactEnum.CHANNEL:
        return new ChannelContactStrategy();

      default:
        throw new Error("Invalid Contact Type");
    }
  }
}