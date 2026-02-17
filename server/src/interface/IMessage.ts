import mongoose, { Document } from "mongoose";

export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    recipient?: mongoose.Types.ObjectId;
    messageType: "text" | "file";
    content?: string;
}
