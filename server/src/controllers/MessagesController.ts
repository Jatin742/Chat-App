import { AuthRequest } from "../middlewares/AuthMiddleWare";
import { Response, } from "express";
import Message from "../models/MessagesModel";
import { mkdirSync, renameSync } from "node:fs";

export const getMessages = async (request: AuthRequest, response: Response) => {
    try {
        const user1 = request.userId;
        const user2 = request.params.id;
        
        if (user1 === undefined || user2 === undefined) {
            return response.status(400).send("User IDs are required.");
        }
        
        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 }
            ]
        }).sort({ timeStamp: 1 });

        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const uploadFile = async (request: AuthRequest, response: Response) => {
    try {
        if (!request.file) {
            return response.status(400).send("File is required.");
        }
        const date = Date.now();
        let fileDir = `uploads/files/${date}`;
        let fileName = `${fileDir}/${request.file.originalname}`;

        mkdirSync(fileDir, {recursive: true});
        renameSync(request.file.path, fileName);

        return response.status(200).json({filePath: fileName});
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}