import {NextFunction, Request, Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}
export const verifyToken = (request: AuthRequest, response:Response, next: NextFunction) => {
    const token = request.cookies.jwt;
    if(!token){
        return response.status(401).send('You are not authenticated');
    }
    jwt.verify(token, process.env.JWT_KEY as string, async (error: jwt.VerifyErrors | null, payload: string | JwtPayload | undefined)=>{
        if(error){
            return response.status(403).send('Token is not valid');
        }
        const data = payload as TokenPayload;
        request.userId = data.userId;
        // console.log(data);
    });
    next();
}