import { AuthRequest } from "../middlewares/AuthMiddleWare";
import { Response, } from "express";
import User from "../models/UserModel";
import mongoose from "mongoose";
import Message from "../models/MessagesModel";

export const searchContacts = async (request: AuthRequest, response: Response) => {
    try {
        const { searchTerm } = request.query as { searchTerm: string };
        if (searchTerm === undefined || searchTerm === null) {
            return response.status(400).send("Search Term is required.");
        }
        const sanitizedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(sanitizedSearchTerm, 'i');
        const contacts = await User.find({
            $and: [
                { _id: { $ne: request.userId } },
                {
                    $or: [
                        { email: regex },
                        { firstName: regex },
                        { lastName: regex }]
                }
            ]
        });
        return response.status(200).json(contacts);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const getContactsForDMList = async (request: AuthRequest, response: Response) => {
    try {
        const userId = new mongoose.Types.ObjectId(request.userId);
        
        const contacts = await Message.aggregate([
            { $match: { $or: [{ sender: userId }, { receiver: userId }] } },
            { $sort: { timeStamp: -1 } },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timeStamp" },
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo"
                }
            },
            { $unwind: "$contactInfo" },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    firstName: "$contactInfo.firstName",
                    lastName: "$contactInfo.lastName",
                    color: "$contactInfo.color",
                    image: "$contactInfo.image",
                }
            },
            { $sort: { lastMessageTime: -1 } }
        ]);

        return response.status(200).json(contacts);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}