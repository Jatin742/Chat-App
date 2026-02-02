import {  Request, Response, } from "express";
import User from "../models/UserModel";
import { createToken, maxAge } from "../utils/createToken";
import { compare } from "bcrypt";
import { AuthRequest } from "../middlewares/AuthMiddleWare";
import { request } from "node:http";

export const signup = async (request: Request, response: Response)=>{
    try {
        const {email, password, firstName, lastName, image, profileSetup} = request.body;
        
        if(!email || !password){
            return response.status(400).send("Email and Password is required");
        }
        const user = await User.create({email, password});
        response.cookie("jwt", createToken(email, user._id.toString()), {
            maxAge,
            httpOnly: true,
            secure:true,
            sameSite:'none',
        });
        return response.status(201).json(user);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const login = async (request: Request, response: Response)=>{
    try {
        const {email, password} = request.body;
        
        if(!email || !password){
            return response.status(400).send("Email and Password is required");
        }
        const user = await User.findOne({email});
        if(!user){
            return response.status(404).send('User with the given mail not found');
        }
        const auth = await compare(password, user.password);
        if(!auth){
            return response.status(404).send('Password is incorrect');
        }
        response.cookie("jwt", createToken(email, user._id.toString()), {
            maxAge,
            secure:true,
            sameSite:'none',
        }).status(200).json({user});
        return response;
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const getUserInfo = async (request: AuthRequest, response: Response) => {
    try {
        const _id = request.userId;
        const user = await User.findById(_id);
        if(!user){
            return response.status(404).send('User with given id is not found');
        }
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const updateProfile = async (request: AuthRequest, response:Response) => {
    try {
        const _id = request.userId;
        const {firstName, lastName, color }= request.body;
        if(!firstName || !lastName || !color){
            return response.status(400).send('First Name Last Name and color is required');
        }
        const user = await User.findByIdAndUpdate(_id, {firstName, lastName, color}, {new: true, runValidators: true});
        
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}