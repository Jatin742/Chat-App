import { MessageEnum } from "@/enum/MessageEnum";
import { IMessage } from "../interface/IMessage";


export interface FileMessage extends IMessage{
    fileUrl: string;
    messageType: MessageEnum.FILE
}