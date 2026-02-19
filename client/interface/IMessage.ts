export interface IMessage {
  _id: string;
  sender: {
    _id: string;
  };
  recipient: {
    _id: string;
  };
  content: string;
  messageType: "text" | "file";
  timeStamp: Date;
}