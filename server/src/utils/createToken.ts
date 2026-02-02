import { sign } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const maxAge = 3 *24 * 60 * 60 *1000;

export const createToken = (email: string, userId: string) => {
    return sign({email, userId}, process.env.JWT_KEY as string, {expiresIn: maxAge});
}