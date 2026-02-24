import { MessageEnum } from "@/enum/MessageEnum";
import { IMessage } from "../interface/IMessage";


export interface TextMessage extends IMessage{
    content: string;
    messageType: MessageEnum.TEXT
}