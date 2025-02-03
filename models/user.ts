import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

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
  role: number;
  avatar?: string;
  bio?: string;
  profession?: string;
  socialLinks?: SocialLinks;
  verify: Boolean;
  // Method to compare password
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Firstname need at least 3 chars"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Lastname needs at least 3 chars"],
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
      minlength: [6, "Password needs more than 5 chars"],
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "No Bio",
    },
    profession: {
      type: String,
      default: "Content Writter",
    },
    role: {
      type: Number,
      default: 0,
    },
    verify: {
      type: Boolean,
      default: false,
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

// Pre-save middleware to hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt
    const saltRounds = 12; // You can adjust the number of salt rounds as needed
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Replace the plain text password with the hashed one
    user.password = hashedPassword;

    next();
  } catch (error) {
    next(error as any);
  }
});

// Method to compare candidate password with stored hashed password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if the model is already registered in mongoose
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
