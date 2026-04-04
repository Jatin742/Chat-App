import { Request, Response, } from "express";
import User from "../models/UserModel";
import { createToken, maxAge } from "../utils/createToken";
import { compare } from "bcrypt";
import { AuthRequest } from "../middlewares/AuthMiddleWare";
import { renameSync, unlinkSync } from "node:fs";

export const signup = async (request: Request, response: Response) => {
    try {
        const { email, password, firstName, lastName, image, profileSetup } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email and Password is required");
        }
        const user = await User.create({ email, password });
        response.cookie("jwt", createToken(email, user._id.toString()), {
            maxAge,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        response.cookie("profileSetup", user.profileSetup, {
            httpOnly: true,
            maxAge,
            secure: true,
            sameSite: 'none',
        });
        return response.status(201).json({ user });
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email and Password is required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send('User with the given mail not found');
        }
        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(404).send('Password is incorrect');
        }
        // Chain the cookies first, then send the status and data
        // const options = 
        response
            .cookie("jwt", createToken(email, user._id.toString()), {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                expires: new Date(
                    Date.now() + maxAge
                ),
            })
            .status(200)
            .json({ user });
        return response;
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const getUserInfo = async (request: AuthRequest, response: Response) => {
    try {
        const _id = request.userId;
        const user = await User.findById(_id);
        if (!user) {
            return response.status(404).cookie("jwt", "", {
                httpOnly: true,
                maxAge,
                // crossSite: true
                secure: true,
                sameSite: 'none',
            }).send('User with given id is not found');
        }
        response.cookie("jwt", createToken(user.email, user._id.toString()), {
            httpOnly: true,
            maxAge,
            // crossSite: true
            secure: true,
            sameSite: 'none',
        })
        // .cookie("profileSetup", user.profileSetup, {
        //     httpOnly: true,
        //     maxAge,
        //     secure: true,
        //     sameSite: 'none',
        // });
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const updateProfile = async (request: AuthRequest, response: Response) => {
    try {
        const _id = request.userId;

        const { firstName, lastName, color } = request.body;

        if (!firstName || !lastName || color == undefined) {
            return response.status(400).send('First Name Last Name and color is required');
        }

        const user = await User.findByIdAndUpdate(_id, { firstName, lastName, color, profileSetup: true }, { new: true, runValidators: true });
        response.cookie("profileSetup", user?.profileSetup, {
            maxAge,
            secure: true,
            sameSite: 'none',
        });

        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const addProfileImage = async (request: AuthRequest, response: Response) => {
    try {
        if (!request.file) {
            return response.status(400).send('File is Required');
        }
        const date = Date.now();
        let fileName = 'uploads/profiles/' + date + request.file.originalname;
        renameSync(request.file.path, fileName);
        const user = await User.findByIdAndUpdate(request.userId, { image: fileName }, {
            runValidators: true,
            new: true,
        });
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const removeProfileImage = async (request: AuthRequest, response: Response) => {
    try {
        const user = await User.findById(request.userId);
        if (!user) {
            return response.status(400).send('User not Found');
        }
        if (user.image) {
            unlinkSync(user.image);
        }
        user.image = "";
        await user.save();

        return response.status(200).send("Profile Image Removed Successfully");
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

export const logout = async (request: AuthRequest, response: Response) => {
    try {
        response.cookie("jwt", "", {
            maxAge: 1,
            secure: true,
            sameSite: 'none',
        });
        response.cookie("profileSetup", "", {
            maxAge: 1,
            secure: true,
            sameSite: 'none',
        });
        return response.status(200).send("Logged Out Successfully");
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}