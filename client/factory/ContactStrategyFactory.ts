import { ContactType } from "@/enum/ContactType";
import { ChannelContactStrategy } from "@/strategy/ChannelContactStrategy";
import { IContactDetailsStrategy } from "@/strategy/IContactDetailsStrategy";
import { UserContactStrategy } from "@/strategy/UserContactStrategy";

export class ContactStrategyFactory {
  static getStrategy(type: ContactType): IContactDetailsStrategy {
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