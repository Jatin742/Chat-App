import mongoose, { Document, Schema } from "mongoose";
import { genSalt, hash } from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  color?: number;
  profileSetup: boolean;
}

const UserSchema =  new Schema<IUser>({
    email:{
        type: String,
        required: [true, "Email is required"],
        unique:true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    firstName:{
        type: String,
        requuired: false,
    },
    lastName:{
        type: String,
        requuired: false,
    },
    image:{
        type: String,
        requuired: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    }
});

UserSchema.pre<IUser>("save",  async function () {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});


const User = mongoose.model('Users', UserSchema);

export default User;