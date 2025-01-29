import mongoose, { Schema, Document } from "mongoose";

// Define the structure of social links
interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

// Define the User interface extending Document from mongoose
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  socialLinks?: SocialLinks;
}

// Create the User schema
const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    socialLinks: {
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

// Create the model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
