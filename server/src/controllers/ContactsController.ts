import { AuthRequest } from "../middlewares/AuthMiddleWare";
import { Response, } from "express";
import User from "../models/UserModel";

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