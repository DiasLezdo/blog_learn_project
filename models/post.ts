import mongoose, { Schema, Document } from "mongoose";

// Define the structure of a Comment
interface IComment {
  user: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

// Define the structure of a Like
interface ILike {
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

// Define the structure of the Post schema interface
export interface IPost extends Document {
  title: string;
  description: string;
  visible: "private" | "public"; // Enforcing only these two values
  content: string;
  thumbnail: string;
  createdUser: mongoose.Types.ObjectId; // Refers to a User
  comments: IComment[];
  likes: ILike[];
  rating: number; // Rating between 1 and 5
}

// Create the Post schema
const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    visible: {
      type: String,
      enum: ["private", "public"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    createdUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to a User model
      required: true,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Refers to a User model for comment's author
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Refers to a User model for who liked the post
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    rating: {
      type: Number,
      // required: true,
      default: 1,
      min: 1,
      max: 5, // Rating must be between 1 and 5
    },
  },
  { timestamps: true }
);

// Create the model
const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
