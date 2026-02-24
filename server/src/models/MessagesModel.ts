import mongoose from "mongoose";
import { IMessage } from "../interface/IMessage";

const MessageSchema = {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
    },
    messageType: {
        type: String,
        enum: ["TEXT", "FILE"],
        required: true,
    },
    content: {
        type: String,
        required: function(this: IMessage) {
            return this.messageType === "text";
        },
    },
    fileUrl: {
        type: String,
        required: function(this: IMessage) { 
            return this.messageType === "file";
        }
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
}

const Message = mongoose.model<IMessage>("Messages", new mongoose.Schema(MessageSchema));

export default Message;