import { MessageEnum } from "@/enum/MessageEnum";

export interface IMessage {
  _id: string;
  sender: {
    _id: string;
  };
  recipient: {
    _id: string;
  };
  timeStamp: Date;
}